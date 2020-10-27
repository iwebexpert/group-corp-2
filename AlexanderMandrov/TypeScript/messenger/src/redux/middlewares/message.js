import { SEND_MESSAGE_SUCCESS, SEND_BOT_MESSAGE_SUCCESS, DELETE_MESSAGE_SUCCESS, 
  SEND_NEW_CHAT_SUCCESS, sendChatFired, sendBotMessage, fetchChats } from '../ducks/chats';

let timeout = null;

export const messageMiddleware = store => next => action => {
  if (action.type === SEND_MESSAGE_SUCCESS) {
    store.dispatch(fetchChats());
    const { username, chatId } = action.payload;
    const { chatsReducer } = store.getState();
    const { receiver } = chatsReducer;

    clearTimeout(timeout);

    if (username !== 'Bot') {
      timeout = setTimeout(() => {
        store.dispatch(sendBotMessage(username, receiver, chatId));
        store.dispatch(fetchChats());
      }, 2000);
    }
  }

  if (action.type === SEND_BOT_MESSAGE_SUCCESS) {
    const { chatId, text } = action.payload;
    const { router } = store.getState();
    const receiver = text.split(' ')[5];

    if (router.location.pathname !== `/chats/${receiver}`) {
      store.dispatch(sendChatFired(true, chatId));
    }
  }

  if (action.type === SEND_NEW_CHAT_SUCCESS || action.type === DELETE_MESSAGE_SUCCESS) {
    store.dispatch(fetchChats());
  }

  return next(action);
};