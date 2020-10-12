import {
  CHATS_MESSAGE_SEND,
  chatsMessageSendAction,
  fireChatAction,
  unfireChatAction,
} from "../actions/chats";

import { nanoid } from "nanoid";

let response = false;

export const botMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { author, chatId } = action.payload;
    if (author !== "Робот" && !response) {
      response = true;
      setTimeout(() => {
        store.dispatch(
          chatsMessageSendAction({
            id: nanoid(),
            chatId,
            text: `Привет, ${author}! Бот на связи.`,
            author: "Робот",
          })
        );
        store.dispatch(fireChatAction(chatId));
        setTimeout(() => store.dispatch(unfireChatAction(chatId)), 200);
        response = false;
      }, 3000);
    };
  };
  return next(action);
};
