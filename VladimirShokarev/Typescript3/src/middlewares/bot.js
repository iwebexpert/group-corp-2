import { CHATS_MESSAGE_SEND_SUCCESS, chatsMessageSendAction, chatsLoadAction } from "../actions/chats";
import { nanoid } from "nanoid";

let timer = null;

export const botMiddware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND_SUCCESS) {
        clearTimeout(timer);

        const { author, chatId } = action.payload;
        const botAnswer = `Привет, ${author}, Бот на связи`

        if (author !== "Bot") {
            timer = setTimeout(() => {
                store.dispatch(chatsMessageSendAction(
                    { id: nanoid(), chatId, text: botAnswer, author: "Bot" }
                ));
                store.dispatch(chatsLoadAction());
            }, 2000);
        }
    }

    return next(action);
};