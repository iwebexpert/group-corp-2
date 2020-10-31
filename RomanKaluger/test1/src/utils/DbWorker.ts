import connectionConfig from "../configs/connectionConfig";
import swal from "sweetalert";
import {store} from "../redux/StorageRedux";
import uniqid from 'uniqid';
import {chatTypes, messageTypes, systemMessages} from "../configs/statuses";
import {Dispatch} from "redux";
import {CommonAction, ISetFrowardMessagePayload} from "../redux/reduxTypes/rdxActions";
import {IAuthData, IChat, IContacts, IMessage, IRegisterData, IUpdateData, IUser} from "../types/globalTypes";

type TStringValued = { value: string };

export interface IInputAuth extends HTMLFormControlsCollection {
    authEmail: TStringValued;
    authPassword: TStringValued;
}

export interface IInputReg extends HTMLFormControlsCollection {
    regEmail: TStringValued;
    regName: TStringValued;
    regPassword: TStringValued;
    regAge: TStringValued;
    regSex: TStringValued;
    regAva: TStringValued;
    regCity: TStringValued;
    regCountry: TStringValued;
    regStatus: TStringValued;
}

export interface IInputUpdate extends HTMLFormControlsCollection {
    Name: TStringValued;
    Age: TStringValued;
    Sex: TStringValued;
    City: TStringValued;
    AvaUrl: TStringValued;
    Country: TStringValued;
    familyStatus: TStringValued;
}

enum HTTPMethods {
    POST = 'POST', GET = 'GET', DELETE = 'DELETE', UPDATE = 'UPDATE'
}

export class DbWorker {
    static dispatch: Dispatch<CommonAction> = store.dispatch;
    static auth = async (formData: IInputAuth): Promise<IUser | null> => {
        const body: IAuthData = {
            email: formData.authEmail.value,
            password: formData.authPassword.value,
        };
        return await DbWorker.reqAuthorized<IUser>(`${connectionConfig.hostHttp}/auth`, body, false);
    };
    static register = async (formData: IInputReg): Promise<IUser | null> => {
        const body: IRegisterData = {
            email: formData.regEmail.value,
            name: formData.regName.value,
            password: formData.regPassword.value,
            age: formData.regAge.value,
            sex: formData.regSex.value,
            avatarUrl: formData.regAva.value,
            city: formData.regCity.value,
            country: formData.regCountry.value,
            familyStatus: formData.regStatus.value,
        };
        const res: IUser | null = await DbWorker.reqAuthorized<IUser>(`${connectionConfig.hostHttp}/register`, body, false);
        if (res) {
            swal("Успешно", 'Теперь авторизуйтесь', "success");
        }
        return res;
    };
    static updateUser = async (formData: IInputUpdate): Promise<IUser | null> => {
        const body: IUpdateData = {
            name: formData.Name.value,
            age: formData.Age.value,
            sex: formData.Sex.value,
            avatarUrl: formData.AvaUrl.value,
            city: formData.City.value,
            country: formData.Country.value,
            familyStatus: formData.familyStatus.value,
        };
        const res: IUser | null = await DbWorker.reqAuthorized<IUser>(`${connectionConfig.hostHttp}/update/user/`, body, true);
        if (res) {
            swal("Успешно", 'Данные обновлены', "success");
        }
        return res;
    };
    static reqAuthorized = async <T>(url: string, body: object = {}, isAuth: boolean = true, method: HTTPMethods = HTTPMethods.POST): Promise<T | null> => {
        try {
            const curUser: IUser | null = store.getState().app.curUser;
            const res: Response = await fetch(url, {
                method,
                headers: {
                    authorization: isAuth && curUser ? curUser.token : '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const json: T | { message: string } = await res.json();
            if ('message' in json && !res.ok) {
                swal('Ошибка', json.message, 'error');
                return null;
            }
            return json as T;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static createMessage = (text: string, forwardMessageRaw: null | ISetFrowardMessagePayload = null,
                            {messageType, content}: { messageType: messageTypes, content: string[] | string | null }
                                = {messageType: messageTypes.TEXT, content: null}): IMessage => {
        content = content ?? [];
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        const forwardMessages: IMessage[] | null = forwardMessageRaw
            ? forwardMessageRaw.messages.map((x: Partial<IMessage>): IMessage => ({
                text: x.text ?? '-',
                dateSend: x.dateSend ?? 0,
                author: x.author ?? '-',
                authorName: x.authorName ?? '-',
                type: x.type ?? messageTypes.TEXT,
                content: x.content ?? null,
                forwardMessages: x.forwardMessages || [],
                isForward: true,
                _id: uniqid(),
                whoRead: [curUser._id]
            }))
            : null;
        return {
            text,
            dateSend: Date.now(),
            author: curUser._id,
            authorName: Object.values(systemMessages).includes(messageType as unknown as systemMessages) ? '?' : curUser ? curUser.name : '-',
            type: messageType,
            content,
            forwardMessages,
            isForward: false,
            whoRead: [curUser._id],
            _id: uniqid(),
        };
    };
    static sendMessage = async (text: string, forwardMessageRaw: ISetFrowardMessagePayload | null = null,
                                {messageType, content}: { messageType: messageTypes, content?: string[] | string | null }): Promise<IMessage | null> => {
        const {selectedChat, chats, curUser}: { selectedChat: string | null, chats: IChat[], curUser: IUser | null } = store.getState().app;
        content = content ?? null;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        const selChatObj: IChat | undefined = chats.find((x: IChat): boolean => x._id === selectedChat);
        if (!selChatObj) {
            throw new Error('Чат не найден');
        }
        const message: IMessage = selChatObj.members.includes(curUser._id)
            ? DbWorker.createMessage(text, forwardMessageRaw, {messageType, content})
            : DbWorker.createMessage('Вы были исключены из этой беседы, ваши сообщения никто не увидит', null, {
                messageType: messageTypes.SYSTEM_TEXT_PRIVATE,
                content: null
            });
        return await DbWorker.reqAuthorized<IMessage>(`${connectionConfig.hostHttp}/chats/shared/${selChatObj.sharedId}/message`, message);
    };
    static createConversation = async ({members, title}: { members: string[], title: string }): Promise<IChat | null> => {
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        const newChat: Partial<IChat> = {
            title,
            members: [...members, curUser._id],
            creator: curUser._id,
            type: chatTypes.CONVERSATION
        };
        return await DbWorker.reqAuthorized<IChat>(`${connectionConfig.hostHttp}/chats`, newChat);
    };
    static createChat = async (user: IUser): Promise<IChat | null> => {
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        const newChat: Partial<IChat> = {
            title: user.name,
            members: [user._id, curUser._id],
            creator: curUser._id,
            type: chatTypes.DIALOG
        };
        return await DbWorker.reqAuthorized<IChat>(`${connectionConfig.hostHttp}/chats`, newChat);
    };
    static deleteChat = async (chatId: string): Promise<void> => {
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/owner/id/${curUser._id}/${chatId}`, undefined, true, HTTPMethods.DELETE);
    };
    static deleteMessage = async (chatId: string, messageId: string): Promise<void> => {
        await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/chat/message/${chatId}/message`, {messageId}, true, HTTPMethods.DELETE);
    };
    static deleteManyMessages = async (chatId: string, messageIdsArr: string[]): Promise<void> => {
        await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/chat/message/many/${chatId}/message`, {messageIdsArr}, true, HTTPMethods.DELETE);
    };
    static addFriend = async (friend: IUser): Promise<IUser | null> => {
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        const body: { userId: string, friendId: string } = {
            userId: curUser._id,
            friendId: friend._id
        };
        return await DbWorker.reqAuthorized<IUser>(`${connectionConfig.hostHttp}/users/user/friends`, body, true, HTTPMethods.POST);
    };
    static removeFriend = async (friend: IUser): Promise<IUser | null> => {
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        if (!curUser) {
            throw new Error('Пользователь не найден');
        }
        const body: { userId: string, friendId: string } = {
            userId: curUser._id,
            friendId: friend._id
        };
        return await DbWorker.reqAuthorized<IUser>(`${connectionConfig.hostHttp}/users/user/friends`, body, true, HTTPMethods.DELETE);
    };
    static authGet = async (url: string, user: IUser): Promise<Response> => {
        return await fetch(url, {
            headers: {
                authorization: user ? user.token : 'unauth',
                'Content-Type': 'application/json',
            }
        });
    };
    static getMessages = async (chatId: string): Promise<IMessage[]> => {
        try {
            const {curUser}: { curUser: IUser | null } = store.getState().app;
            if (!curUser) {
                throw new Error('Пользователь не найден');
            }
            const msgRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/messages/chatid/${chatId}`, curUser);
            const msgs: IMessage[] | { message: string } = await msgRes.json();
            if ('message' in msgs) {
                swal('Ошибка', msgs.message, 'error');
                return [];
            }
            if (!msgRes.ok) {
                swal('Ошибка', 'Неизвестная Ошибка', 'error');
                return [];
            }
            return msgs;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return [];
        }
    };
    static getUnreadMessages = async (chatId: string): Promise<IMessage[]> => {
        try {
            const curUser: IUser | null = store.getState().app.curUser;
            if (!curUser) {
                throw new Error('Пользователь не найден');
            }
            const msgRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/messages/unreadmessages/chatid/${chatId}`, curUser);
            const msg: IMessage[] | { message: string } = await msgRes.json();
            if ('message' in msg) {
                swal('Ошибка', msg.message, 'error');
                return [];
            }
            if (!msgRes.ok) {
                swal('Ошибка', 'Неизвестная Ошибка', 'error');
                return [];
            }
            return msg;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return [];
        }
    };
    static getMessageById = async (messageId: string): Promise<IMessage | null> => {
        try {
            const curUser: IUser | null = store.getState().app.curUser;
            if (!curUser) {
                throw new Error('Пользователь не найден');
            }
            const msgRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/messages/messageid/${messageId}`, curUser);
            const msg: IMessage | { message: string } = await msgRes.json();
            if ('message' in msg) {
                swal('Ошибка', msg.message, 'error');
                return null;
            }
            if (!msgRes.ok) {
                swal('Ошибка', 'Неизвестная Ошибка', 'error');
                return null;
            }
            return msg;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static tickMessagesAsRead = async (chat: IChat): Promise<void> => {
        await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/shared/message/updateStatus/`,
            {isRead: true, sharedId: chat.sharedId});
    };
    static updateChats = async (): Promise<null | IChat[]> => {
        const curUser: IUser | null = store.getState().app.curUser;
        if (curUser) {
            const defaultChatsRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
            return await defaultChatsRes.json();
        }
        return null;
    };
    static updateChat = async (sharedId: string): Promise<null | IChat> => {
        try {
            const {curUser, chats}: { curUser: IUser | null, chats: IChat[] } = store.getState().app;
            if (curUser) {
                const needChat: IChat | undefined = chats.find((ch: IChat): boolean => ch.sharedId === sharedId);
                if (!needChat) {
                    return null;
                }
                const chatRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/chat/${needChat._id}`, curUser);
                return await chatRes.json();
            }
            return null;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static updateContacts = async (input: string): Promise<null | IContacts> => {
        try {
            const curUser = store.getState().app.curUser;
            if (!curUser) {
                return null;
            }
            let friendsRes: Response, subscribersRes: Response, subscriptionsRes: Response, othersRes: Response,
                friends: IUser[], subscribers: IUser[], subscriptions: IUser[], others: IUser[];
            friendsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/friends/ownerid/${curUser._id}`, curUser);
            subscribersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/subscribers/ownerid/${curUser._id}`, curUser);
            subscriptionsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/subscriptions/ownerid/${curUser._id}`, curUser);
            friends = await friendsRes.json();
            subscribers = await subscribersRes.json();
            subscriptions = await subscriptionsRes.json();
            if (!input) {
                others = [];
            } else {
                othersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/name/${input}`, curUser);
                others = await othersRes.json();
                others = others.filter((x: IUser): boolean => x._id !== curUser._id);
            }
            return {friends, subscriptions, subscribers, others}

        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static getUserIdRange = async (stringRange: string): Promise<IUser[]> => {
        const curUser: IUser | null = store.getState().app.curUser;
        if (!curUser) {
            return [];
        }
        const res: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/idrange/${stringRange}`, curUser);
        return await res.json();
    };
    static pushChatData = async ({sharedChatId, newParams}: { sharedChatId: string, newParams: Partial<IChat> }): Promise<IChat | null> => {
        const body: { sharedChatId: string, newParams: Partial<IChat> } = {sharedChatId, newParams};
        const res: IChat | null = await DbWorker.reqAuthorized<IChat>(`${connectionConfig.hostHttp}/update/chat/`, body, true);
        if (res) {
            swal("Успешно", 'Данные обновлены', "success");
        }
        return res;
    };
}
