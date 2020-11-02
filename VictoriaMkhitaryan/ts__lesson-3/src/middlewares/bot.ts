import { Middleware } from 'redux';
import { nanoid } from 'nanoid';
import { ChatsActionTypes } from '../store/messenger/actionTypes';
import { messageSend, changeUnreadMessage } from '../store/messenger/actions';


let interval: any = null;

export const botMiddleware: Middleware = store => next => action => {
  if (action.type == ChatsActionTypes.SEND_MESSAGE) {
    const { author, chatId } = action.payload;

    if (author !== 'Robot') {
      interval = setTimeout(() => {
        // не могу понять в чем ошибка и исправить ее
        // то что написали в телеге исправила но все равно не работает
        // @ts-ignore
        store.dispatch(messageSend({ id: nanoid(), chatId, message: `${author}, пора спатки`, author: 'Robot' }));

        const currentURL = window.location.href.split('/');

        if (currentURL[3] === 'chats' && chatId != currentURL[4]) {
          // @ts-ignore
          store.dispatch(changeUnreadMessage(chatId, 'add'));
        } else if (currentURL[3] === 'chats' && chatId == currentURL[4]) {
          // @ts-ignore
          store.dispatch(changeUnreadMessage(chatId, 'remove'));
        }
      },3000);
    } else 
      clearTimeout(interval);
  }

  return next(action);
}
