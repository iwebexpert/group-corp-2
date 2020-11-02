import { Middleware } from "redux";
import { unfireChat } from "../actions/chats";
let timer: NodeJS.Timeout | null = null;
export const unfire: Middleware = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    timer = setTimeout(() => {
      if (action.payload.chatId) {
        store.dispatch(unfireChat(action.payload.chatId));
        timer && clearTimeout(timer);
      }
    }, 3500);
  }
  return next(action);
};
