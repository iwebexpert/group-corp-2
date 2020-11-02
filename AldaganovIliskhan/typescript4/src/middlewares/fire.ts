import { Middleware } from "redux";
import { fireChat } from "../actions/chats";
let timer: NodeJS.Timeout | null = null;
export const fire: Middleware = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    timer = setTimeout(() => {
      if (action.payload.chatId) {
        store.dispatch(fireChat(action.payload.chatId));
        timer && clearTimeout(timer);
      }
    }, 1500);
  }
  return next(action);
};
