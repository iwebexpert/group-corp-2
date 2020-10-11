import { SET_SEND_MESSAGE, SET_SEND_BOT_MESSAGE, setSendBotMessage, setFireChat } from '../ducks/chats';

let timeout = null;

export const messageMiddleware = store => next => action => {
  if (action.type === SET_SEND_MESSAGE) {
    const { username, receiver, chatId } = action.payload;

    if (username !== 'Bot') {
      timeout = setTimeout(() => {
        store.dispatch(setSendBotMessage(username, receiver, chatId));
      }, 2000);
    }
  }

  if (action.type === SET_SEND_BOT_MESSAGE) {
    const { receiver, chatId } = action.payload;
    const { router } = store.getState();

    clearTimeout(timeout);

    if (router.location.pathname !== `/chats/${receiver}`) {
      store.dispatch(setFireChat(true, chatId));
    }
  }

  return next(action);
};