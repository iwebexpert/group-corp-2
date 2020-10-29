import { LOCATION_CHANGE, push } from 'connected-react-router';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { findChatIdByReceiver, findChatByReceiver } from '../../utils/utils';
import { sendChatFired, ChatsActionTypes, fetchChats } from '../ducks/chats';

let flg = true;

export const fireMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction) => {
  if (action.type === LOCATION_CHANGE) {
    const { pathname } = action.payload.location;
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
      if (chat && chat.fired)
        dispatch(
          sendChatFired(!chat.fired, findChatIdByReceiver(chats, receiver))
        );
    }
  }

  if (action.type === ChatsActionTypes.SEND_FIRE_SUCCESS) {
    store.dispatch(fetchChats());
  }

  return next(action);
};
