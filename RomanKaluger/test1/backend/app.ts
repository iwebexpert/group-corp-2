import {chatTypes, messageTypes, wsTypes} from './config/statuses';
import WebSocket from 'ws';
import config from './config/serverConfig';
import uniqid from 'uniqid';
import express, {Express, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose, {Mongoose, Types} from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {IMessage, IMessageDoc, messageModel} from './models/messageSchema';
import {IUser, IUserDoc, userModel} from './models/userSchema';
import {chatModel, IChatDoc} from './models/chatSchema';


interface IWithUserReq extends express.Request{
    user: IUser;
}
interface IWithUserWs extends WebSocket{
    userId: string;
}
interface IWSMessage {
    type: wsTypes,
    body: {
        [p: string]: any
    }
}
type broadCastConditionType<T extends WebSocket> =  (ws: T) => boolean;

async function start(): Promise<void> {
    const DB: Mongoose = await mongoose.connect(config.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
    DB.connection.on('error', function(err: Error): void {
        console.log(err.message);
    });
    DB.connection.once('open', function(): void {
        console.log("mongodb connection open");
    });

    const app: Express = express();
    app.use(cors());
    app.use(express.urlencoded({extended: false}));
    app.use(bodyParser.json({ 'type': '*/*',limit: '20mb' }));
    app.use(express.json());
    app.use(cookieParser());

    const checkAuthentication: (auth: string) => IUser | null = (authorization) => {
        try {
            return  jwt.verify(authorization, config.TOKEN_SECRET_KEY) as IUser;
        } catch(err) {
            return null;
        }
    };
    const checkAuthenticationMiddleware = (req: express.Request, res: express.Response, next: NextFunction ): void =>{
        if(req.headers.authorization){
            if(req.headers.authorization === 'unauth') {
                res.status(401).json({'message': 'Выполнен выход из аккаунта'});
                return;
            }
            const decoded: IUser | null = checkAuthentication(req.headers.authorization);
            if (!decoded) {
                res.status(403).json({'message': 'Пользователь не авторизован'});
                return;
            }
            (req as IWithUserReq).user = decoded;
            next();
            return;
        }
        res.status(403).json({'message': 'Пользователь не авторизован(нет токена)'});
    };
    const getChatsForUser = async (id: string): Promise<IChatDoc[]>  => {
        return chatModel.find({owner: id}).lean();
    };

    const wss: WebSocket.Server = new WebSocket.Server({port: +config.port});

    function broadCast(actionType: wsTypes, body: object | null, condition: broadCastConditionType<IWithUserWs>): void {
        wss.clients.forEach((client: WebSocket): void => {
            if (client.readyState === WebSocket.OPEN && condition(client as IWithUserWs)) {
                client.send(JSON.stringify({
                    type: actionType,
                    body
                }));
            }
        });
    }

    wss.on('connection', (ws: IWithUserWs): void => {
        ws.on('message', async (msg: string): Promise<void> => {
            const msgParsed: IWSMessage  = JSON.parse(msg);
            if (msgParsed.type === wsTypes.REMEMBER_ME) {
                ws.userId = msgParsed.body.userId;
            }
        });
    });

    app.use('/chats', checkAuthenticationMiddleware);
    app.use('/messages', checkAuthenticationMiddleware);
    app.use('/update', checkAuthenticationMiddleware);

    app.get('/chats/owner/:ownerid', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const userId: string = req.params.ownerid;
            const chats: IChatDoc[] = await getChatsForUser(userId);
            res.status(200).json(chats);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске чатов'});
        }

    });
    app.get('/chats/messages/chatid/:chatid', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const chatid: string = req.params.chatid;
            const chat: IChatDoc | null = await chatModel.findById({_id: chatid}).lean();
            if (!chat) {
                res.status(400).json({message: 'Ошибка при поиске сообщений'});
                return;
            }
            const isUserMember: Types.ObjectId | undefined = chat.members.find((x: Types.ObjectId): boolean  => x.equals((req as IWithUserReq).user._id));
            const messages: IMessageDoc[] = await messageModel.find({
                _id: {$in: chat.messages},
                author: {$in: isUserMember ? chat.members : [(req as IWithUserReq).user._id]},
                type: isUserMember ? {$in: Object.values(messageTypes).filter((x: messageTypes): boolean => x !== messageTypes.SYSTEM_TEXT_PRIVATE)} : messageTypes.SYSTEM_TEXT_PRIVATE  }).lean();
            res.status(200).json(messages);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске сообщений'});
        }
    });
    app.get('/chats/messages/unreadmessages/chatid/:chatid', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const user: IUser = (req as IWithUserReq).user;
            const chatid: string = req.params.chatid;
            const chat: IChatDoc | null = await chatModel.findById({_id: chatid}).lean();
            if (chat){
                let messages: IMessageDoc[] = await messageModel.find({_id: { $in: chat.messages} }).lean();
                messages = messages.filter((x: IMessageDoc): boolean => !x.whoRead.includes(user._id));
                res.status(200).json(messages);
                return;
            }
            res.status(400).json({message: 'Ошибка при поиске чата'});
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске сообщений'});
        }
    });

    app.post('/chats', async (req: express.Request, res: express.Response): Promise<void> => {
        const {title, members, creator, type}: {title: string, members: string[], creator: string, type: chatTypes} = req.body;
        try {
            if(!title){
                res.status(400).json({error: 'Некорректные данные'});
                return;
            }
            const sharedId: string = uniqid();
            let createdChat: IChatDoc | null = null;
            const creatorObj: IUserDoc[] = await userModel.find({_id: creator}).lean();
            const existedChat: IChatDoc | null = await chatModel.findOne({members, type: chatTypes.DIALOG});
            if (existedChat && type === chatTypes.DIALOG){
                createdChat = new chatModel({
                    title,
                    members: existedChat.members,
                    owner: creator,
                    messages: existedChat.messages,
                    sharedId: existedChat.sharedId,
                    type,
                    creator: existedChat.creator
                });
                createdChat.save();
            } else {
                members.forEach((member: string): void => {
                    let newChat: IChatDoc;
                    if (members.length === 2 && member !== creator) {
                        newChat = new chatModel({
                            title: type === chatTypes.DIALOG ? creatorObj[0].name : title,
                            members,
                            owner: member,
                            messages: [],
                            sharedId,
                            type,
                            creator
                        });
                    } else {
                        newChat = new chatModel({title, members, owner: member, messages: [], sharedId, type, creator});
                    }
                    newChat.save();
                    if (creator === member) {
                        createdChat = newChat;
                    }
                });
           }
            broadCast(wsTypes.CHATS, null, (client: IWithUserWs): boolean => members.includes(client.userId));
            res.status(200).json(createdChat);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    });

    app.delete('/chats/owner/id/:ownerid/:chatid', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            if(!(req.params.ownerid && req.params.chatid)){
                res.status(400).json({error: 'Неверные данные'});
                return;
            }
            await chatModel.findOneAndRemove({_id: req.params.chatid});
            res.status(200);
            broadCast(wsTypes.CHATS, null, (client: IWithUserWs): boolean => client.userId === req.params.ownerid);
        } catch (e) {
            res.status(400).json({error: 'Не удалось удалить чат'});
        }

    });

    app.post('/chats/shared/:sharedid/message', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const sharedid: string = req.params.sharedid;
            const {author, authorName, text, dateSend,forwardMessages, isForward, type, content}
            : {author: string, authorName: string, text: string, dateSend: string,forwardMessages: IMessage, isForward: boolean, type: messageTypes, content: string} = req.body;
            if(!author && (!forwardMessages && !text)){
                res.status(400).json({message: 'Не передан текст сообщения (text) или имя автора (author)'});
                return;
            }
            const message: IMessageDoc = new messageModel(
                {
                    text: text || ' ',
                    dateSend,
                    author,
                    authorName,
                    content,
                    isForward,
                    type: type || messageTypes.TEXT,
                    forwardMessages: forwardMessages || [],
                    whoRead: [author]
                });
            await message.save();
            const sharedChats: IChatDoc[] = await chatModel.find({sharedId: sharedid});
            let chat: IChatDoc;
            for (chat of sharedChats) {
                chat.messages.push(message._id);
                await chat.save();
            }
            broadCast(wsTypes.MESSAGE, {
                sharedId: sharedid
            }, (): boolean => true);
            res.status(200).json(message);
        } catch (e) {
            res.status(500).json({error: 'Не удалось сохранить сообщение в БД'});
        }
    });

    app.post('/chats/shared/message/updateStatus/', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const user: IUser = (req as IWithUserReq).user;
            const {sharedId, isRead}: {sharedId: string, isRead: boolean} = req.body;//оставим isread вместо whoread для совместимости
            if(!sharedId){
                res.status(400).json({message: 'Не передан статус'});
                return;
            }
            const sharedChats: IChatDoc[] = await chatModel.find({sharedId: sharedId}).lean();
            const messagesIds: Types.ObjectId[] = Array.from(new Set(sharedChats.map((ch: IChatDoc): Types.ObjectId[] => ch.messages).flat()));
            const messages: IMessageDoc[] = await messageModel.find({_id: {$in: messagesIds}});
            let mes: IMessageDoc;
            for (mes of messages) {
                if (mes.author !== user._id && isRead && !mes.whoRead.includes(user._id)){
                    mes.whoRead = [...mes.whoRead, user._id];
                    await mes.save();
                }
            }
            broadCast(wsTypes.MESSAGE, {
                sharedId
            }, (): boolean => true);
            res.status(200).json({message: 'Данные обновлены'});
        } catch (e) {
            console.log(e.message);
            res.status(500).json({error: 'Не удалось сохранить сообщение в БД'});
        }
    });

    app.delete('/chats/chat/message/:chatid/message', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const chatid: string = req.params.chatid;
            const {messageId}: {messageId: string} = req.body;
            if(!messageId){
                res.status(400).json({message: 'Не передан messageId'});
                return;
            }
            const chat: IChatDoc | null = await chatModel.findOne({_id: chatid});
            if (chat){
                chat.messages = chat.messages.filter((m: Types.ObjectId): boolean => !m.equals(messageId));
                await chat.save();
                res.status(200).json({message: 'Удалено'});
                broadCast(wsTypes.MESSAGE, {
                    sharedId: chat.sharedId
                }, () => true);
                return;
            }
            res.status(500).json({error: 'Не удалось удалить сообщение из БД'});
        } catch (e) {
            res.status(500).json({error: 'Не удалось удалить сообщение из БД'});
        }
    });
    app.delete('/chats/chat/message/many/:chatid/message', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const chatid: string = req.params.chatid;
            const {messageIdsArr}: {messageIdsArr: string[]} = req.body;
            if(!messageIdsArr){
                res.status(400).json({message: 'Не передан messageIds'});
                return;
            }
            const chat: IChatDoc | null = await chatModel.findOne({_id: chatid});
            if (chat){
                chat.messages = chat.messages.filter((m: Types.ObjectId): boolean => !messageIdsArr.find(m1=>m.equals(m1)));
                await chat.save();
                res.status(200).json({message: 'Удалено'});
                broadCast(wsTypes.MESSAGE, {
                    sharedId: chat.sharedId
                }, (): boolean => true);
                return;
            }
            res.status(500).json({error: 'Не удалось удалить сообщения из БД'});
        } catch (e) {
            res.status(500).json({error: 'Не удалось удалить сообщения из БД'});
        }
    });

    app.get('/chats/chat/:chatid', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const chatId: string = req.params.chatid;
            const chat: IChatDoc | null = await chatModel.findById({_id: chatId}).lean();
            res.status(200).json(chat);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске чатов'});
        }
    });
    app.get('/chats/title/:ownerid/:title', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const chats: IChatDoc[] = await chatModel.find({ title: { $regex: `.*${req.params.title}.*`, $options: 'i' }, owner: req.params.ownerid }).lean();
            res.status(200).json(chats);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске чата'});
        }
    });
    app.get('/chats/member/:memberid', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const memberid: string = req.params.memberid;
            const chats: IChatDoc[] = await chatModel.find({members: [memberid as unknown as Types.ObjectId]}).lean();
            res.status(200).json(chats);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске чата'});
        }
    });

    app.get('/users/name/:name', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const name: string = req.params.name;
            const users: IUserDoc[] = await userModel.find({'name':  { $regex: `.*${name}.*`, $options: 'i' }}).lean();
            res.status(200).json(users);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        }
    });
    app.get('/users/idrange/:idrange', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const range: string = req.params.idrange;
            const usersIds: string[] = range.split('-');
            const users: IUserDoc[] = await userModel.find({_id: { $in: usersIds}}).lean();
            res.status(200).json(users);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        }
    });


    app.get('/users/user/friends/ownerid/:id', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const user: IUserDoc | null = await userModel.findOne({_id: id}).lean();
            if (user){
                const friends: IUserDoc[] = await userModel.find({ _id: { $in: user.subscriptions }, subscriptions: { $elemMatch: {$eq: user._id}}}).lean();
                res.status(200).json(friends);
                return;
            }
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        }
    });
    app.get('/users/user/subscribers/ownerid/:id', async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const user: IUserDoc | null = await userModel.findOne({_id: id}).lean();
            if (user){
                let subscribers: IUserDoc[] = await userModel.find({ subscriptions: { $elemMatch: {$eq: user._id}}}).lean();
                subscribers = subscribers.filter(x => !user.subscriptions.some(s => s.equals(x._id)));
                res.status(200).json(subscribers);
                return;
            }
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        }
    });
    app.get('/users/user/subscriptions/ownerid/:id',  async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const user: IUserDoc | null = await userModel.findOne({_id: id}).lean();
            if (user){
                let  subscriptions = await userModel.find({ _id: { $in: user.subscriptions }}).lean();
                subscriptions = subscriptions.filter(x => !user.subscribers.some(s => s.equals(x._id)));
                res.status(200).json(subscriptions);
                return;
            }
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        } catch (e) {
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        }
    });
    app.post('/users/user/friends', async  (req: express.Request, res: express.Response): Promise<void> => {
        const {userId, friendId}: {userId: string, friendId: string} = req.body;
        try {
            if(!userId || !friendId){
                res.status(400).json({error: 'Некорректные данные'});
                return;
            }
            const user: IUserDoc | null = await userModel.findOne({_id: userId});
            if (user){
                const potentialFriend: IUserDoc | null = await userModel.findOne({_id: friendId});
                if (!potentialFriend){
                    res.status(400).json({message: 'Ошибка при поиске пользователей'});
                    return;
                }
                const friendMongoId: Types.ObjectId = new mongoose.Types.ObjectId(friendId);
                const userMongoId: Types.ObjectId = new mongoose.Types.ObjectId(userId);
                if (!user.subscriptions.includes(friendMongoId)){
                    user.subscriptions.push(friendMongoId);
                }
                if (!potentialFriend.subscribers.includes(userMongoId)){
                    potentialFriend.subscribers.push(userMongoId);
                }
                await user.save();
                await potentialFriend.save();
                broadCast(wsTypes.CONTACTS, null, (client: IWithUserWs): boolean => userId === client.userId || friendId === client.userId);
                res.status(200).json(user);
                return;
            }
            res.status(400).json({message: 'Ошибка при поиске пользователей'});
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    });
    app.delete('/users/user/friends', async (req: express.Request, res: express.Response): Promise<void> => {
        const {userId, friendId}: {userId: string, friendId: string} = req.body;
        try {
            if(!userId || !friendId){
                res.status(400).json({error: 'Некорректные данные'});
                return;
            }
            const user: IUserDoc | null = await userModel.findOne({_id: userId});
            const potentialFriend: IUserDoc | null = await userModel.findOne({_id: friendId});
            if (!user || !potentialFriend){
                res.status(400).json({message: 'Ошибка при поиске пользователей'});
                return;
            }
            user.subscriptions = user.subscriptions.filter((x: Types.ObjectId): boolean => !x.equals(friendId));
            potentialFriend.subscribers =  potentialFriend.subscribers.filter((x: Types.ObjectId) => !x.equals(userId));
            await user.save();
            await potentialFriend.save();
            broadCast(wsTypes.CONTACTS, null, (client: IWithUserWs): boolean =>  userId === client.userId || friendId === client.userId);
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    });
    app.post('/update/user/', async  (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const gotUser: IUser = (req as IWithUserReq).user;
            const {name, age, sex, avatarUrl, city, country, familyStatus}: {name:string, age: number, sex:string, avatarUrl:string, city:string, country:string, familyStatus:string} = req.body;
            const user: IUserDoc | null = await userModel.findOne({_id: gotUser._id});
            if (!user){
                res.status(400).json({message: 'Ошибка при поиске пользователей'});
                return;
            }
            user.name = name;
            user.age = age;
            user.sex = sex;
            user.city = city;
            user.country = country;
            user.familyStatus = familyStatus;
            user.avatarUrl = avatarUrl;
            await user.save();
            res.status(200).json({
                ...user._doc,
                password: undefined,
                token: jwt.sign(JSON.parse(JSON.stringify(user._doc)), config.TOKEN_SECRET_KEY)
        });
        } catch (e) {
            res.status(400).json({message: 'Ошибка при обновлении данных'});
        }
    });
    app.post('/update/chat/', async  (req: express.Request, res: express.Response): Promise<void> => {
        const {newParams, sharedChatId}: {newParams: {[key: string]: string}, sharedChatId: string} = req.body;
        try {
            if(!sharedChatId || ! newParams){
                res.status(400).json({error: 'Некорректные данные'});
                return;
            }
            const chats: IChatDoc[] = await chatModel.find({sharedId: sharedChatId});
            Object.keys(newParams).forEach((key: string): void => {
                chats.forEach((ch: IChatDoc): void => {
                    ch[key] = newParams[key];
                });
            });
            let ch: IChatDoc;
            for (ch of chats){
                await ch.save();
            }
            const allMembers: Types.ObjectId[] = Array.from(new Set(chats.map((x: IChatDoc): Types.ObjectId[] => x.members).flat()));
            broadCast(wsTypes.CHATS, null, (client: IWithUserWs): boolean => !!allMembers.find((x: Types.ObjectId): boolean => x.equals(client.userId)));
            res.status(200).json(chats.find((ch: IChatDoc): boolean => ch.owner.equals((req as IWithUserReq).user._id)));
        } catch (e) {
            res.status(400).json({message: 'Ошибка при обновлении данных'});
        }
    });

    const genders: string[] = ['Мужской', 'Женский'];
    const familyStatuses: string[] = ['Женат(Замужем)','Свободен(а)'];
    app.post('/register', async  (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const {email, name, password, age, sex, avatarUrl, country, city, familyStatus}: {[p:string]: string} = req.body;
            if(!email || !password || (sex && !genders.includes(sex)) || (familyStatus && !familyStatuses.includes(familyStatus))){
                res.status(400).json({message: 'Неверные регистрационные данные'});
                return;
            }
            const candidate: IUserDoc[] = await userModel.find({ $or:[ {name}, {email} ]}).lean();
            if (candidate.length){
                res.status(400).json({message: 'Почта или имя уже задействованы'});
                return;
            }
            const user: IUserDoc = new userModel({email, name, password, friends: [], age, sex, avatarUrl: avatarUrl || '', country, city, familyStatus});
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            res.status(400).json({message: 'Ошибка при регистрации'});
        }
    });
    app.post('/auth', async  (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const {email, password}: {email: string, password: string} = req.body;
            if(!email || !password){
                res.status(400).json({message: 'Не передан email или password'});
                return;
            }
            const user: IUserDoc | null = await userModel.findOne({email});
            if(!user){
                res.status(401).json({message: 'Пользователь не найден'});
                return;
            }
            if(!user.validatePassword(password)){
                res.status(401).json({message: 'Неправильный логин/пароль'});
                return;
            }
            const plainUser: IUser = JSON.parse(JSON.stringify(user));
            delete plainUser.password;
            res.status(201).json({
                ...plainUser,
                token: jwt.sign(plainUser, config.TOKEN_SECRET_KEY)
            });
        } catch (e) {
            res.status(400).json({message: 'Ошибка при авторизации'});
        }

    });
    app.get('*',  (req: express.Request, res: express.Response): void => {
        res.status(404).json({'message': 'Page not found'});
    });
    app.listen(config.portHttp, (): void => {
        console.log('Serverstarted!');
        console.log('http://localhost:4001');
    });
}
start();
