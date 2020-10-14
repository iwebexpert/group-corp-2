import { CHATS_MESSAGE_SEND_SUCCESS, chatsMessageSendAction } from "../actions/chats";
import { nanoid } from "nanoid";

let timer = null;

export const botMiddware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND_SUCCESS) {
        const { author, chatId } = action.payload;
        const botAnswer = `Привет, ${author}, Бот на связи`

        if (author !== "Bot") {
            timer = setTimeout(() => {
                store.dispatch(chatsMessageSendAction(
                    { id: nanoid(), chatId, text: botAnswer, author: 'Bot' }
                ));
            }, 3000);
        }

        if (author === "Bot") {
            clearTimeout(timer);
        }
    }

    return next(action);
};