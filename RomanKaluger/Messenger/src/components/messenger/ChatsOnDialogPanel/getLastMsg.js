import {DbWorker} from "../../../utils/DbWorker";

export async function getLastMsg(chatId, setMessage) {
    const messages = await DbWorker.getMessages(chatId);
    if (!messages.length) {
        setMessage(null);
    }
    setMessage(messages[messages.length - 1]);
}
