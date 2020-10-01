import {DbWorker} from "../../../utils/DbWorker";
import connectionConfig from "../../../configs/connectionConfig";
import {setSelectedChat} from "../../../redux/actions";
import {categories} from "./categories";

export default async function (input, curUser, setDialogs, selectedChat, dispatch) {
    try {
        if (curUser) {
            let defaultChatsRes, defaultContactsRes;
            if (!input) {
                defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
                defaultContactsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/friends/ownerid/${curUser._id}`, curUser);
            } else {
                defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/title/${curUser._id}/${input}`, curUser);
                defaultContactsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/name/${input}`, curUser);
            }
            const defaultContacts = await defaultContactsRes.json();
            const defaultChats = await defaultChatsRes.json();
            setDialogs(prev => ({
                contacts: defaultContacts,
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
            contacts: [],
            chats: [],
            category: categories.CHATS
        });
    }
}
