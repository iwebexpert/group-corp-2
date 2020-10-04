import {DbWorker} from "../../../utils/DbWorker";
import connectionConfig from "../../../configs/connectionConfig";
import {setSelectedChat} from "../../../redux/actions";
import {categories} from "./categories";

export default async function (input, curUser, setDialogs, selectedChat, dispatch) {
    try {
        if (curUser) {
            let defaultChatsRes, friendsRes, subscribersRes, subscriptionsRes, othersRes, friends, subscribers, subscriptions, others;
            friendsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/friends/ownerid/${curUser._id}`, curUser);
            subscribersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/subscribers/ownerid/${curUser._id}`, curUser);
            subscriptionsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/subscriptions/ownerid/${curUser._id}`, curUser);
            friends = await friendsRes.json();
            subscribers = await subscribersRes.json();
            subscriptions = await subscriptionsRes.json();
            if (!input) {
                defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
                others = [];
            } else {
                defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/title/${curUser._id}/${input}`, curUser);
                othersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/name/${input}`, curUser);
                others = await othersRes.json();
                others = others.filter(x => x._id !== curUser._id);
            }
            const defaultChats = await defaultChatsRes.json();
            setDialogs(prev => ({
                contacts: {
                    friends,
                    subscriptions,
                    subscribers,
                    others
                },
                chats: defaultChats,
                category: prev.category
            }));
            if (selectedChat) {
                const newSelChatVersion = defaultChats.find(ch => ch.sharedId === selectedChat.sharedId) || null;
                dispatch(setSelectedChat(newSelChatVersion));
            }
        }
    } catch (e) {
        setDialogs({
            contacts: {
                friends: [],
                subscriptions: [],
                subscribers: [],
                others: []
            },
            chats: [],
            category: categories.CHATS
        });
    }
}
