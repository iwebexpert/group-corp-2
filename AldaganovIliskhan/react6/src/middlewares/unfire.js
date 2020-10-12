import { unfireChat } from "../actions/chats";
let timer = null;
export const unfire = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    const currentLocation = store.getState().router.location.pathname.slice(7);
    timer = setTimeout(() => {
      if (+currentLocation === action.payload.chatId) {
        store.dispatch(unfireChat(action.payload.chatId));
      }
      clearTimeout(timer);
    }, 3500);
  }
  return next(action);
};
