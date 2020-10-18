import {DbWorker} from "../../utils/DbWorker";
import {setChats} from "../actions";

async function analyzeMessages(chats, curUser) {
    if (!curUser) {
        return;
    }
    for (let chat of chats) {
        const messages = (await DbWorker.getMessages(chat._id));
        let unReadCount = 0;
        messages.forEach(x => {
            x.isRead = x.author === curUser._id ? x.whoRead.length > 1 : x.whoRead.includes(curUser._id);
            if (!x.isRead && x.author !== curUser._id){
                unReadCount++;
            }
        });
        chat.unReadCount = messages.reduce((acc, x) => acc + (x.author !== curUser._id && !x.whoRead.includes(curUser._id) ? 1 : 0), 0);
        chat.lastMessage = messages[messages.length - 1];
        chat.activeMessages = messages;
    }
}

export const getChatSelectorInfo = store => next => async action => {
    if (action.type === setChats().type) {
        const {curUser, selectedChat} = store.getState().app;
        const chats = action.payload;
        await analyzeMessages(chats, curUser, selectedChat);
    }
    return next(action);
};
