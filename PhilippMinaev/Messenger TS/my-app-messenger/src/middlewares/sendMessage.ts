import { Middleware } from "redux";
import { ChatsActionTypes, messageSendAction } from "../actions/chats";

export const addMessageMiddleware: Middleware = (store) => (next) => (
  action
) => {
  if (action.type == ChatsActionTypes.CHATS_MESSAGE_SEND)
    store.dispatch(messageSendAction(action.payload));
  return next(action);
};
