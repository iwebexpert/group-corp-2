import actionTypes from "../actionTypes";
import {DbWorker} from "../../utils/DbWorker";

async function analyzeMessages(chats, curUser) {
    if (!curUser) {
        return;
    }
    for (let chat of chats) {
            const messages = (await DbWorker.getMessages(chat._id));
            chat.unReadCount = messages.reduce((acc, x) => acc + (x.author !== curUser._id && !x.isRead ? 1 : 0), 0);
            chat.lastMessage = messages[messages.length - 1];
            chat.activeMessages = messages;
    }
    console.log('ff')
}
export const getChatSelectorInfo = store => next => async action => {
    if (action.type === actionTypes.SET_CHATS) {
            const {curUser, selectedChat} = store.getState().app;
            const chats = action.payload;
            await analyzeMessages(chats, curUser, selectedChat);
        }
    return next(action);
};
