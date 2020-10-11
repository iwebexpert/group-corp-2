import {DbWorker} from "../../../utils/DbWorker";
import connectionConfig from "../../../configs/connectionConfig";
import {setChats, setContacts, signalMessageGot} from "../../../redux/actions";
import {store} from "../../../redux/StorageRedux";

export class UpdaterMessenger {
    static dispatch = store.dispatch;
    static updateChats = async () => {
        const curUser = store.getState().app.curUser;
        if (curUser) {
            const defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
            const defaultChats = await defaultChatsRes.json();
            UpdaterMessenger.dispatch(setChats(defaultChats));
        }
    };
    static updateChat = async (sharedId) => {
        const {curUser, chats} = store.getState().app;
        if (curUser) {
            const needChat = chats.find(ch => ch.sharedId === sharedId);
            const chatRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/chat/${needChat._id}`, curUser);
            const chat = await chatRes.json();
            UpdaterMessenger.dispatch(setChats(chats.map(ch => ch._id === chat._id ? chat : ch)));
        }
    };
    static updateContacts = async (input) => {
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
            UpdaterMessenger.dispatch(setContacts({
                friends,
                subscriptions,
                subscribers,
                others
            }));
        }
    };
}
