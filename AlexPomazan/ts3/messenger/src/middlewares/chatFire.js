import { chatFireAction, CHATS_MESSAGE_SEND_SUCCESS } from "../actions/chats";

export const chatFireMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND_SUCCESS) {
    const { chatId } = action.payload;
    const currentLocation = store.getState().router.location.pathname.slice(7);
    if (!chatId) {
      return next(action);
    }
    if (currentLocation != chatId) {
      console.log(currentLocation);
      console.log(chatId);
      store.dispatch(chatFireAction(chatId));
    }
  }

  return next(action);
};
