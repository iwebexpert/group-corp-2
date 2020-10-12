import { CHATS_MESSAGE_SEND, chatsMessageSendAction } from "../actions/chats";
import { nanoid } from "nanoid";

let timer = null;

export const botMiddware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND) {
        const { author, chatId } = action.payload;
        const botAnswer = [`Привет, ${author}, чем я могу тебе помочь?`, `${author}, спроси что-нибудь проще.`, `Очень интересная история, ${author}`, `Не согласен с тобой, ${author}.`, `Привет, ${author}, приятно познакомиться!`, `${author}, повтори, пожалуйста.`, `${author}, полностью согласен!`, `${author}, как дела?`, `${author}, погода и правда сегодня хорошая.`, `${author}, пока!`];

        const randomMessage = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
        const index = randomMessage(1, 10);

        if (author !== "Bot") {
            timer = setTimeout(() => {
                store.dispatch(chatsMessageSendAction(
                    { id: nanoid(), chatId, text: botAnswer[index - 1], author: 'Bot' }
                ));
            }, 3000);
        }

        if (author === "Bot") {
            clearTimeout(timer);
        }
    }

    return next(action);
};

