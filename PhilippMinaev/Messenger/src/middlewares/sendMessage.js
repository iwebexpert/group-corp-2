import { CHATS_MESSAGE_SEND, messageSendAction } from "../actions/chats";

export const addMessageMiddleware = (store) => (next) => (action) => {
  if (action.type == CHATS_MESSAGE_SEND)
    store.dispatch(messageSendAction(action.payload));
  return next(action);
};
