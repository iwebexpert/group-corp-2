import {
  fireChatAction,
  unfireChatAction,
  messagesSendAction,
  MESSAGES_SEND_SUCCESS,
} from "../actions/chats";

import { nanoid } from "nanoid";

let response = false;

export const botMiddleware = (store) => (next) => (action) => {
  if (action.type === MESSAGES_SEND_SUCCESS) {
    const { author, chatId } = action.payload;
    if (author !== "Робот" && !response) {
      response = true;
      setTimeout(() => {
        store.dispatch(
          messagesSendAction({
            id: nanoid(),
            chatId,
            text: `Привет, ${author}! Бот на связи.`,
            author: "Робот",
          })
        );
        store.dispatch(fireChatAction(chatId));
        setTimeout(() => store.dispatch(unfireChatAction(chatId)), 200);
        response = false;
      }, 2000);
    };
  };
  return next(action);
};
