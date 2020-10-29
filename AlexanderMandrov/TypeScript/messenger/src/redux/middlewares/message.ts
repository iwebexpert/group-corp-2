import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { RouterState } from 'connected-react-router';
import {
  ChatsActionTypes,
  sendChatFired,
  sendBotMessage,
  fetchChats,
  ChatsReducerState,
} from '../ducks/chats';

let timeout: number | null = null;

export const messageMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction) => {
  if (action.type === ChatsActionTypes.SEND_MESSAGE_SUCCESS) {
    store.dispatch(fetchChats());
    const {
      username,
      chatId,
    }: { username: string; chatId: string } = action.payload;
    const {
      chatsReducer,
    }: { chatsReducer: ChatsReducerState } = store.getState();
    const { receiver }: { receiver: string | null } = chatsReducer;

    if (timeout) clearTimeout(timeout);

    if (username !== 'Bot') {
      timeout = window.setTimeout(() => {
        if (receiver)
          store.dispatch(sendBotMessage(username, receiver, chatId));
        store.dispatch(fetchChats());
      }, 2000);
    }
  }

  if (action.type === ChatsActionTypes.SEND_BOT_MESSAGE_SUCCESS) {
    const { chatId, text }: { chatId: string; text: string } = action.payload;
    const { router }: { router: RouterState } = store.getState();
    const receiver: string = text.split(' ')[5];

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
