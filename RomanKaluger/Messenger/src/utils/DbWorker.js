import connectionConfig from "../configs/connectionConfig";
import {openUserProfile, setChats, setCurrentUser} from "../redux/actions";
import swal from "sweetalert";
import {store} from "../redux/StorageRedux";
import uniqid from 'uniqid';
import {messageTypes} from "../configs/statuses";

export class DbWorker {
    static dispatch = store.dispatch;
    static auth = async (formData) =>{
        const body = {
            email: formData.authEmail.value,
            password: formData.authPassword.value,
        };
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/auth`, body, false);
    };
    static register = async (formData) => {
        const body = {
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
        const res = await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/register`, body, false);
        if (res) {
            swal("Успешно", 'Теперь авторизуйтесь', "success");
        }
        return res;
    };
    static updateUser = async (formData) => {
        const body = {
            name: formData.Name.value,
            age: formData.Age.value,
            sex: formData.Sex.value,
            avatarUrl: formData.AvaUrl.value,
            city: formData.City.value,
            country: formData.Country.value,
            familyStatus: formData.familyStatus.value,
        };
        const res = await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/update/user/`, body, true);
        if (res) {
            swal("Успешно", 'Данные обновлены', "success");
        }
        return res;
    };
    static reqAuthorized = async (url, body ={}, isAuth = true, method = 'POST') => {
        try {
            const curUser = store.getState().app.curUser;
            const res = await fetch(url, {
                method,
                headers: {
                    authorization: isAuth ? curUser.token : null,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const json = await res.json();
            if (!res.ok) {
                swal('Ошибка', json.message, 'error');
                return null;
            }
            return json;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static createMessage = (text, forwardMessageRaw=null, {messageType, content} ={messageType: messageTypes.TEXT, content: null}) => {
        const { curUser } = store.getState().app;
        const forwardMessages = forwardMessageRaw
            ? forwardMessageRaw.messages.map(x =>  ({
                text: x.text,
                dateSend: x.dateSend,
                author: x.author,
                authorName: x.authorName,
                type: x.type,
                content: x.content,
                forwardMessages: x.forwardMessages || [],
                isForward: true,
                _id: uniqid()
            }))
            : null;
        return {
            text,
            dateSend: Date.now(),
            author: curUser._id,
            authorName: curUser.name,
            type:messageType,
            content,
            forwardMessages,
            isForward: false
        };
    };
    static sendMessage = async (text, forwardMessageRaw = null, {messageType, content}) => {
        const { selectedChat, chats } = store.getState().app;
        const selChatObj = chats.find(x => x._id === selectedChat);
        const message = DbWorker.createMessage(text,forwardMessageRaw, {messageType, content});
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/shared/${selChatObj.sharedId}/message`, message);
    };
    static createChat = async (user) => {
        const {curUser} = store.getState().app;
        const newChat = {
            title: user.name,
            members: [user._id, curUser._id],
            creator: curUser._id,
        };
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats`, newChat);
    };
    static deleteChat = async (chatId) => {
        const {curUser} = store.getState().app;
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/owner/id/${curUser._id}/${chatId}`, undefined, true,'DELETE');
    };
    static deleteMessage = async (chatId, messageId) => {
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/chat/message/${chatId}/message`, {messageId}, true,'DELETE');
    };
    static deleteManyMessages = async (chatId, messageIdsArr) => {
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/chat/message/many/${chatId}/message`, {messageIdsArr}, true,'DELETE');
    };
    static addFriend = async (friend) =>{
        const {curUser} = store.getState().app;
        const body = {
            userId: curUser._id,
            friendId: friend._id
        };
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/users/user/friends`, body, true,'POST');
    };
    static removeFriend = async (friend) =>{
        const {curUser} = store.getState().app;
        const body = {
            userId: curUser._id,
            friendId: friend._id
        };
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/users/user/friends`, body, true,'DELETE');
    };
    static authGet = async (url, user) => {
        return await fetch(url, {
            headers: {
                authorization: user ? user.token : 'unauth',
                'Content-Type': 'application/json',
            }
        });
    };
    static getMessages = async (chatId) => {
        try {
            const curUser = store.getState().app.curUser;
            const msgRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/messages/chatid/${chatId}`, curUser);
            const msgs = await msgRes.json();
            if (!msgRes.ok) {
                swal('Ошибка', msgs.message, 'error');
                return [];
            }
            return msgs;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return [];
        }
    };
    static getUnreadMessages = async (chatId) => {
        try {
            const curUser = store.getState().app.curUser;
            const msgRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/messages/unreadmessages/chatid/${chatId}`, curUser);
            const msg = await msgRes.json();
            if (!msgRes.ok) {
                swal('Ошибка', msg.message, 'error');
                return null;
            }
            return msg;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return [];
        }
    };
    static getMessageById = async (messageId) => {
        try {
            const curUser = store.getState().app.curUser;
            const msgRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/messages/messageid/${messageId}`, curUser);
            const msg = await msgRes.json();
            if (!msgRes.ok) {
                swal('Ошибка', msg.message, 'error');
                return null;
            }
            return msg;
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static tickMessagesAsRead = async (chat) => {
        return await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/shared/message/updateStatus/`,
            {isRead: true, sharedId: chat.sharedId});
    };
    static updateChats = async () => {
        const curUser = store.getState().app.curUser;
        if (curUser) {
            const defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
            return await defaultChatsRes.json();
        }
        return null;
    };
    static updateChat = async (sharedId) => {
        try {
            const {curUser, chats} = store.getState().app;
            if (curUser) {
                const needChat = chats.find(ch => ch.sharedId === sharedId);
                const chatRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/chat/${needChat._id}`, curUser);
                return await chatRes.json();
            }
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };
    static updateContacts = async (input) => {
        try {
            const curUser = store.getState().app.curUser;
            if (curUser) {
                let friendsRes, subscribersRes, subscriptionsRes, othersRes, friends, subscribers,
                    subscriptions, others;
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
                    others = others.filter(x => x._id !== curUser._id);
                }
                return { friends, subscriptions, subscribers, others}
            }
        } catch (e) {
            swal('Ошибка', e.message, 'error');
            return null;
        }
    };

}
