import {DbWorker} from "../../../utils/DbWorker";

export async function getLastMsg(chatId) {
    const messages = await DbWorker.getMessages(chatId);
    if (!messages.length) {
        return null;
    }
    return messages[messages.length - 1];
}
