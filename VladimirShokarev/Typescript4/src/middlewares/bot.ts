import {ChatsActionTypes, chatsMessageSendAction, chatsLoadAction} from '../actions/chats';
import { nanoid } from "nanoid";
import { Middleware } from 'redux';

let timer: NodeJS.Timeout | null = null;

export const botMiddware: Middleware = store => next => action => {
    if (action.type === ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS) {
        if (timer) {
            clearTimeout(timer);
        };

        const { author, chatId } = action.payload;
        const botAnswer = `Привет, ${author}, Бот на связи`

        if (author !== "Bot") {
            timer = setTimeout(() => {
                store.dispatch(chatsMessageSendAction(
                    { id: nanoid(), chatId, text: botAnswer, author: "Bot" }
                ));
                store.dispatch(chatsLoadAction());
            }, 2000);
        };
    };

    return next(action);
};