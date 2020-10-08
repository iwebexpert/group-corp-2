import connectionConfig from "../configs/connectionConfig";
import {openUserProfile, setCurrentUser} from "../redux/actions";
import swal from "sweetalert";
import {store} from "../redux/StorageRedux";
import uniqid from 'uniqid';

export class DbWorker {
    static dispatch = store.dispatch;
    static auth = async (formData) =>{
        const body = {
            email: formData.authEmail.value,
            password: formData.authPassword.value,
        };
        const json = await DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/auth`, body, false);
        if (json) {
            DbWorker.dispatch(setCurrentUser(json));
        }
        return json;
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
        DbWorker.dispatch(setCurrentUser(res));
        DbWorker.dispatch(openUserProfile(res));
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
    static createMessage = (text, forwardMessageRaw=null) => {
        const { curUser } = store.getState().app;
        const forwardMessages = forwardMessageRaw
            ? forwardMessageRaw.messages.map(x =>  ({
                text: x.text,
                dateSend: x.dateSend,
                author: x.author,
                authorName: x.authorName,
                forwardMessages: x.forwardMessages,
                isForward: true,
                _id: uniqid()
            }))
            : null;
        return {
            text,
            dateSend: Date.now(),
            author: curUser._id,
            authorName: curUser.name,
            forwardMessages,
            isForward: false
        };
    };
    static sendMessage = async (text, forwardMessageRaw = null) => {
        const { selectedChat, chats } = store.getState().app;
        const selChatObj = chats.find(x => x._id === selectedChat);
        const message = DbWorker.createMessage(text,forwardMessageRaw);
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


}
