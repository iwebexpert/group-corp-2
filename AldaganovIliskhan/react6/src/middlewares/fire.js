import { fireChat } from "../actions/chats";
let timer = null;
export const fire = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    const currentLocation = store.getState().router.location.pathname.slice(7);
    timer = setTimeout(() => {
      if (+currentLocation === action.payload.chatId) {
        store.dispatch(fireChat(action.payload.chatId));
      }
      clearTimeout(timer);
    }, 1500);

    //   setTimeout(() => {
    //     store.dispatch(unfireChat(pathname, chatId));
    //   }, 3000);
  }
  return next(action);
};
