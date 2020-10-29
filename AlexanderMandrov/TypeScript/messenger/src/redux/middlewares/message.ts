import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import {
  ChatsActionTypes,
  sendChatFired,
  sendBotMessage,
  fetchChats,
} from '../ducks/chats';

let timeout: number | null = null;

export const messageMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction) => {
  if (action.type === ChatsActionTypes.SEND_MESSAGE_SUCCESS) {
    store.dispatch(fetchChats());
    const { username, chatId } = action.payload;
    const { chatsReducer } = store.getState();
    const { receiver } = chatsReducer;

    if (timeout) clearTimeout(timeout);

    if (username !== 'Bot') {
      timeout = window.setTimeout(() => {
        store.dispatch(sendBotMessage(username, receiver, chatId));
        store.dispatch(fetchChats());
      }, 2000);
    }
  }

  if (action.type === ChatsActionTypes.SEND_BOT_MESSAGE_SUCCESS) {
    const { chatId, text } = action.payload;
    const { router } = store.getState();
    const receiver = text.split(' ')[5];

    if (router.location.pathname !== `/chats/${receiver}`) {
      store.dispatch(sendChatFired(true, chatId));
    }
  }

  if (
    action.type === ChatsActionTypes.SEND_NEW_CHAT_SUCCESS ||
    action.type === ChatsActionTypes.DELETE_MESSAGE_SUCCESS
  ) {
    store.dispatch(fetchChats());
  }

  return next(action);
};
