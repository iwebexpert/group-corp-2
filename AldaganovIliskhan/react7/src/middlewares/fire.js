import { fireChat } from "../actions/chats";
let timer = null;
export const fire = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    timer = setTimeout(() => {
      if (action.payload.chatId) {
        store.dispatch(fireChat(action.payload.chatId));
        clearTimeout(timer);
      }
    }, 1500);
  }
  return next(action);
};
