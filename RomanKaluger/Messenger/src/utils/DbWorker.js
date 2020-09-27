import connectionConfig from "../configs/connectionConfig";
import {setCurrentUser} from "../redux/actions";
import swal from "sweetalert";
import {store} from "../redux/StorageRedux";

export class DbWorker {
    static dispatch = store.dispatch;
    static auth = async (formData) =>{
        const body = {
            email: formData.authEmail.value,
            password: formData.authPassword.value,
        };
        const json = await DbWorker.postAuthorized(`${connectionConfig.hostHttp}/auth`, body, false);
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
        };
        const res = await DbWorker.postAuthorized(`${connectionConfig.hostHttp}/register`, body, false);
        if (res) {
            swal("Успешно", 'Теперь авторизуйтесь', "success");
        }
        return res;
    };
    static postAuthorized = async (url, body, isAuth = true) => {
        try {
            const curUser = store.getState().app.curUser;
            const res = await fetch(url, {
                method: 'POST',
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
    static sendMessage = async (text) => {
        const { selectedChat, curUser } = store.getState().app;
        const message = {
            text,
            dateSend: Date.now(),
            author: curUser._id,
            authorName: curUser.name
        };
        return await DbWorker.postAuthorized(`${connectionConfig.hostHttp}/chats/shared/${selectedChat.sharedId}/message`, message);
    };
    static createChat = async (user) => {
        const {curUser} = store.getState().app;
        const newChat = {
            title: user.name,
            members: [user._id, curUser._id],
            creator: curUser._id,
        };
        return await DbWorker.postAuthorized(`${connectionConfig.hostHttp}/chats`, newChat);
    };
    static authGet = async (url, user) => {
        return await fetch(url, {
            headers: {
                authorization: user.token,
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
}
