import {DbWorker} from "../../../utils/DbWorker";

export async function checkMessagesForSelectorInfo(chatId, setMessage, setUnReadCount, curUser) {
    const messages = await DbWorker.getMessages(chatId);
    if (!messages.length) {
        setMessage(null);
    }
    const unreadCount = messages.reduce((acc, x) => acc +( x.author !== curUser._id && !x.isRead ? 1 : 0),0);
    setUnReadCount(unreadCount);
    setMessage(messages[messages.length - 1]);
}
