import { SEND_MESSAGE } from '../store/messenger/actionTypes';
import { messageSend, changeUnreadMessage } from '../store/messenger/actions';
import { nanoid } from 'nanoid';

export const botMiddleware = store => next => action => {
  if (action.type == SEND_MESSAGE) {
    const { author, chatId } = action.payload;

    if (author !== 'Robot') {
      setTimeout(() => {
        store.dispatch(messageSend({ id: nanoid(), chatId, message: `${author}, пора спатки`, author: 'Robot' }));

        const currentURL = window.location.href.split('/');

        if (currentURL[3] === 'chats' && chatId != currentURL[4]) {
          store.dispatch(changeUnreadMessage(chatId, 'add'));
        } else if (currentURL[3] === 'chats' && chatId == currentURL[4]) {
          store.dispatch(changeUnreadMessage(chatId, 'remove'));
        }

        console.log('!!!!!!!!!');
      }, 1000);
    }
  }

  return next(action);
}