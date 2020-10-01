const statuses = require("./config/statuses");
const WebSocket = require('ws');
const config = require('./config/serverConfig');
const uniqid = require('uniqid');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const messageModel = require('./models/messageSchema');
const userModel = require('./models/userSchema');
const chatModel = require('./models/chatSchema');

mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

const checkAuthentication = (authorization) => {
    try {
        return  jwt.verify(authorization, config.TOKEN_SECRET_KEY);
    } catch(err) {
        return false;
    }
};
const checkAuthenticationMiddleware = (req, res, next) =>{
    if(req.headers.authorization){
        if(req.headers.authorization === 'unauth') {
            res.status(401).json({'message': 'Выполнен выход из аккаунта'});
            return;
        }
        const decoded = checkAuthentication(req.headers.authorization);
        if (!decoded) {
                res.status(403).json({'message': 'Пользователь не авторизован'});
                return;
            }
            req.user = decoded;
            next();
            return;
        }
    res.status(403).json({'message': 'Пользователь не авторизован(нет токена)'});
};
const getChatsForUser = async (id) => {
    return await chatModel.find({owner: id}).lean();
};

const wsTypes = statuses.wsTypes;
const wss = new WebSocket.Server({port: config.port});

function broadCast(actionType, body, condition){
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && condition(client)) {
            client.send(JSON.stringify({
                type: actionType,
            }));
        }
    });
}

wss.on('connection', (ws) => {
    ws.on('message', async (msg) => {
        const msgParsed = JSON.parse(msg);
        if (msgParsed.type === wsTypes.REMEMBER_ME) {
                ws.userId = msgParsed.body.userId;
            }
    });
});

app.use('/chats', checkAuthenticationMiddleware);
app.use('/messages', checkAuthenticationMiddleware);

app.get('/chats/owner/:ownerid', async (req, res) => {
    try {
        const userId = req.params.ownerid;
        const chats = await getChatsForUser(userId);
        res.status(200).json(chats);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске чатов'});
    }

});
app.get('/chats/messages/chatid/:chatid', async (req, res) => {
    try {
        const chatid = req.params.chatid;
        const chat = await chatModel.findById({_id: chatid}).lean();
        const messages = await messageModel.find({_id: { $in: chat.messages} }).lean();
        res.status(200).json(messages);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске сообщений'});
    }
});
app.post('/chats', async (req, res) => {
    const {title, members, creator} = req.body;
    try {
        if(!title){
            res.status(400).json({error: 'Некорректные данные'});
            return;
        }
        const sharedId = uniqid();
        let createdChat;
        const creatorObj = await userModel.find({_id: creator}).lean();
        members.forEach(member => {
            let newChat;
            if (members.length === 2 && member !== creator) {
                newChat = new chatModel({title: creatorObj[0].name, members, owner: member, messages: [], sharedId});
            } else {
                newChat = new chatModel({title, members, owner: member, messages: [], sharedId});
            }
            newChat.save();
            if (creator === member) {
                createdChat = newChat;
            }
        });
        broadCast(wsTypes.CHATS, null, (client) => members.includes(client.userId));
        res.status(200).json(createdChat);
    } catch (e) {
        res.status(200).json({message: e.message});
    }
});

app.delete('/chats/owner/id/:ownerid/:chatid', async (req, res) => {
    try {
        const {ownerid, chatid} = req.params;
        if(!(ownerid && chatid)){
            res.status(400).json({error: 'Неверные данные'});
            return;
        }
        await chatModel.findOneAndRemove({owner: ownerid, _id: chatid}, (err, doc) => {
            if(err){
                res.status(400).json({error: 'Не удалось удалить чат'});
                return;
            }
            res.json(doc);
        });
        broadCast(wsTypes.CHATS, null, (client) => client.userId === ownerid);
    } catch (e) {
        res.status(400).json({error: 'Не удалось удалить чат'});
    }

});

let petyaTimeOut = 0;
function PetyaTalks(chat, authorName) {
    ////////Петя-бот
    clearTimeout(petyaTimeOut);
    petyaTimeOut = setTimeout(async () => {
        let petya = await userModel.find({name: 'Петя'}).lean();
        petya = petya[0];
        if (chat.members.includes(petya._id)) {
            const petyaMessage = new messageModel({
                text: `Привет, ${authorName}, я Петя-бот`,
                dateSend: Date.now(),
                author: petya._id,
                authorName: petya.name
            });
            await petyaMessage.save();
            chat.messages.push(petyaMessage._id);
            await chat.save();
            broadCast(wsTypes.MESSAGE, null, () => true);
        }
    },3000);
    ///////Петя-бот
}
app.post('/chats/shared/:sharedid/message', async (req, res) => {
    try {
        const sharedid = req.params.sharedid;
        const {author, authorName, text, dateSend} = req.body;
        if(!author || !text){
            res.status(400).json({message: 'Не передан текст сообщения (text) или имя автора (author)'});
            return;
        }
        const message = new messageModel({text, dateSend, author, authorName});
        await message.save();
        const sharedChats = await chatModel.find({sharedId: sharedid});
        for (const chat of sharedChats) {
            chat.messages.push(message._id);
            PetyaTalks(chat, authorName);
            await chat.save();
        }
        broadCast(wsTypes.MESSAGE, null, () => true);
        res.status(200).json(message);
    } catch (e) {
        res.status(500).json({error: 'Не удалось сохранить сообщение в БД'});
    }
});

app.delete('/chats/chat/message/:chatid/message', async (req, res) => {
    try {
        const {chatid} = req.params;
        const {messageId} = req.body;
        if(!messageId){
            res.status(400).json({message: 'Не передан messageId'});
            return;
        }
        await chatModel.findOneAndUpdate(
            {_id: chatid},
            {$pull: {messages: messageId}},
            (err, doc) => {
                if(err){
                    res.status(500).json({error: 'Не удалось удалить сообщение из БД'});
                    return;
                }
                res.status(200).json(doc);
            });
        broadCast(wsTypes.MESSAGE, null, () => true);
    } catch (e) {
        res.status(500).json({error: 'Не удалось удалить сообщение из БД'});
    }
});

app.get('/chats/chat/:chatid', async (req, res) => {
    try {
        const chatId = req.params.chatid;
        const chat = await chatModel.findById({_id: chatId}).lean();
        res.status(200).json(chat);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске чатов'});
    }
});
app.get('/chats/title/:ownerid/:title', async (req, res) => {
    try {
        const {ownerid,title} = req.params;
        const chats = await chatModel.find({ title: { $regex: `.*${title}.*`, $options: 'i' }, owner: ownerid }).lean();
        res.status(200).json(chats);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске чата'});
    }
});
app.get('/chats/member/:memberid', async (req, res) => {
    try {
        const memberid = req.params.memberid;
        const chats = await chatModel.find({members: [memberid]}).lean();
        res.status(200).json(chats);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске чата'});
    }
});

app.get('/users/name/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const users = await userModel.find({'name':  { $regex: `.*${name}.*`, $options: 'i' }}).lean();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске пользователей'});
    }
});

app.get('/users/user/friends/ownerid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.find({_id: id});
        const friends = await userModel.find({ _id: { $in: user.friends } }).lean();
        res.status(200).json(friends);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при поиске пользователей'});
    }
});
app.post('/register', async (req, res) => {
    try {
        const {email, name, password} = req.body;
        if(!email || !password){
            res.status(400).json({message: 'Не передан email или password'});
            return;
        }
        const candidate = await userModel.find({ $or:[ {name}, {email} ]}).lean();
        if (candidate.length){
            res.status(400).json({message: 'Почта или имя уже задействованы'});
            return;
        }
        const user = new userModel({email, name, password, friends: []});
        await user.save();
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({message: 'Ошибка при регистрации'});
    }

});
app.post('/auth', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({message: 'Не передан email или password'});
            return;
        }
        const user = await userModel.findOne({email});
        if(!user){
            res.status(401).json({message: 'Пользователь не найден'});
            return;
        }
        if(!user.validatePassword(password)){
            res.status(401).json({message: 'Неправильный логин/пароль'});
            return;
        }
        const plainUser = JSON.parse(JSON.stringify(user));
        delete plainUser.password;
        res.status(201).json({
            ...plainUser,
            token: jwt.sign(plainUser, config.TOKEN_SECRET_KEY)
        });
    } catch (e) {
        res.status(400).json({message: 'Ошибка при авторизации'});
    }

});
app.get('*', (req, res) => {
    res.status(404).json({'message': 'Page not found'});
});
app.listen(config.portHttp, () => {
    console.log('Serverstarted!');
    console.log('http://localhost:4001');
});
