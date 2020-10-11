import { findChatIndexByReceiver, findChatByReceiver } from '../../utils/utils';
import { setFireChat } from '../ducks/chats';

export const fireMiddleware = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const receiver = action.payload.location.pathname.split('/')[2];
    const { chatsReducer } = store.getState();
    const { chats } = chatsReducer;
    if (chats && receiver) {
      const chat = findChatByReceiver(chats, receiver);
      if (chat.fired) store.dispatch(setFireChat(!chat.fired, findChatIndexByReceiver(chats, receiver)));
    }
  }
  
  return next(action);
};