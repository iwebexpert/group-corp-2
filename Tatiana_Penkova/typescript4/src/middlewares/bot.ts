import { chatsLoadAction } from "../actions/chats";
import { MessageActionTypes } from "../actions/messages";
import { chatsMessageSendAction } from "../actions/messages";
import { nanoid } from "nanoid";
import { Middleware } from "redux";
import { ActionType } from "../types";

let timer: NodeJS.Timeout | null = null;

export const botMiddware: Middleware = store => next => (action: ActionType) => {
    if (action.type === MessageActionTypes.CHATS_MESSAGE_SEND_SUCCESS) {
        if (timer) {
            clearTimeout(timer);
        }
        const { author, chatId } = action.payload;
        const botAnswer: string[] = [`Привет, ${author}, чем я могу тебе помочь?`, `${author}, спроси что-нибудь проще.`, `Очень интересная история, ${author}`, `Не согласен с тобой, ${author}.`, `Привет, ${author}, приятно познакомиться!`, `${author}, повтори, пожалуйста.`, `${author}, полностью согласен!`, `${author}, как дела?`, `${author}, погода и правда сегодня хорошая.`, `${author}, пока!`];

        const randomMessage = (min: number, max: number): number => Math.floor(min + Math.random() * (max + 1 - min));
        const index: number = randomMessage(1, 10);
        if (author !== "Bot") {

            timer = setTimeout((): void => {
                store.dispatch(chatsMessageSendAction(
                    { id: nanoid(), chatId, text: botAnswer[index - 1], author: "Bot" }
                ));
                store.dispatch(chatsLoadAction());
            }, 2000);
        }
    }
    return next(action);
};

