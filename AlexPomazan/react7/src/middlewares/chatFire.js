import { chatFireAction, CHATS_MESSAGE_SEND_SUCCESS } from "../actions/chats";

export const chatFireMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND_SUCCESS) {
    const { chatId } = action.payload;
    const str = store.getState().router.location.pathname;
    const chatPath = /\d+$/.test(str);
    if (!chatId) {
      return next(action);
    }
    if (chatPath != action.payload.chatId) {
      store.dispatch(chatFireAction(chatId));
    }
  }

  return next(action);
};
