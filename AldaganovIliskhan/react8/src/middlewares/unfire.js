import { unfireChat } from "../actions/chats";
let timer = null;
export const unfire = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    timer = setTimeout(() => {
      if (action.payload.chatId) {
        store.dispatch(unfireChat(action.payload.chatId));
        clearTimeout(timer);
      }
    }, 3500);
  }
  return next(action);
};
