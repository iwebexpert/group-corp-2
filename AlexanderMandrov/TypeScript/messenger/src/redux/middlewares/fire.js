import { LOCATION_CHANGE, push } from 'connected-react-router';
import { findChatIdByReceiver, findChatByReceiver } from '../../utils/utils';
import { sendChatFired, SEND_FIRE_SUCCESS, fetchChats } from '../ducks/chats';

let flg = true;

export const fireMiddleware = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    const { pathname } = action.payload.location
    const receiver = pathname.split('/')[2];
    const { chatsReducer } = store.getState();
    const { chats } = chatsReducer;
    const { dispatch } = store;

    if (chats === null && flg && pathname !== '/') {
      flg = false;
      dispatch(push('/'));
    }

    if (chats && receiver) {
      const chat = findChatByReceiver(chats, receiver);
      if (chat && chat.fired) dispatch(sendChatFired(!chat.fired, findChatIdByReceiver(chats, receiver)));
    }
  }

  if (action.type === SEND_FIRE_SUCCESS) {
    store.dispatch(fetchChats());
  }
  
  return next(action);
};