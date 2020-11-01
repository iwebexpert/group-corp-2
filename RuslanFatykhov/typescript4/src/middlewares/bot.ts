import { nanoid } from "nanoid";
import { ThunkMiddleware } from "redux-thunk"; // no changes here 😀

import {
  ChatsActionTypes,
  messagesSendAction,
  fireChatAction,
  unfireChatAction,
} from "../actions/chats";

let response: boolean = false;

export const botMiddleware: ThunkMiddleware = (store) => (next) => (action) => {
  if (action.type === ChatsActionTypes.MESSAGES_SEND_SUCCESS) {
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
        store.dispatch(fireChatAction(chatId, true));
        setTimeout(() => store.dispatch(unfireChatAction(chatId, false)), 2000);
        response = false;
      }, 1000);
    }
  }
  return next(action);
};
