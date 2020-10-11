import { SEND_MESSAGE } from '../store/messenger/actionTypes';
import { messageSend } from '../store/messenger/actions';
import { nanoid } from 'nanoid';

export const botMiddleware = store => next => action => {
  if (action.type == SEND_MESSAGE) {
    const { author, chatId } = action.payload;

    if (author !== 'Robot') {
      setTimeout(() => {
        store.dispatch(messageSend({ id: nanoid(), chatId, message: `${author}, it's time for you to sleep`, author: 'Robot' }));
      }, 1000);
    }
  }

  return next(action);
}