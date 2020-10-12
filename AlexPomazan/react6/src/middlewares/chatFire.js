import { chatFireAction, CHATS_MESSAGE_SEND } from "../actions/chats";

export const chatFireMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { chatId } = action.payload;
    const currentLocation = store.getState().router.location.pathname.slice(7);
    if (!chatId) {
      return next(action);
    }
    if (currentLocation != action.payload.chatId) {
      store.dispatch(chatFireAction(chatId));
    }
  }

  return next(action);
};
