import {
  ChatsActionTypes,
  chatsMessageSendAction,
  chatFireAction,
  chatUnfireAction,
} from "../actions/chats";
// import { chatFireAction, ChatsActionTypes } from "../actions/chats";

import { nanoid } from "nanoid";
import { ThunkMiddleware } from "redux-thunk";
let interval: NodeJS.Timeout | null = null;
const botImg: string = "/img/bot.png";

export const botMiddware: ThunkMiddleware = (store) => (next) => (action) => {
  if (action.type === ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS) {
    if (interval) {
      clearTimeout(interval);
    }
    const { author, chatId } = action.payload;
    const messagesBot: string[] = [
      `В России выявили более 7 тысяч зараженных COVID-19, так что, ${author}, носи маску!`,
      `Меня звут Bob, приятно познакомиться, ${author}`,
      `${author}, почему люди такие шумные?`,
      `Извини, ${author}, у меня только несколько реплик, хозяин не научил меня отвечать правильно :(`,
      `Мне интересно всё, что ты пишешь, ${author}!`,
    ];
    const messageBot: string =
      messagesBot[Math.floor(Math.random() * messagesBot.length)];
    if (author !== "Bot Bob") {
      interval = setTimeout((): void => {
        store.dispatch(
          chatsMessageSendAction({
            id: nanoid(),
            chatId,
            text: messageBot,
            img: botImg,
            author: "Bot Bob",
          })
        );
        store.dispatch(chatFireAction(chatId));
        setTimeout(() => store.dispatch(chatUnfireAction(chatId)), 2000);
      }, 1000);
    }
  }
  return next(action);
};
