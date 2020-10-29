import { LOCATION_CHANGE, push } from 'connected-react-router';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { findChatIdByReceiver, findChatByReceiver } from '../../utils/utils';
import {
  sendChatFired,
  fetchChats,
  ChatsReducerState,
  ChatsActionTypes,
} from '../ducks/chats';

let flg: boolean = true;

export const fireMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction) => {
  if (action.type === LOCATION_CHANGE) {
    const { pathname }: { pathname: string } = action.payload.location;
    const receiver: string = pathname.split('/')[2];
    const {
      chatsReducer,
    }: { chatsReducer: ChatsReducerState } = store.getState();
    const { chats } = chatsReducer;
    const { dispatch }: { dispatch: Dispatch } = store;

    if (chats === null && flg && pathname !== '/') {
      flg = false;
      dispatch(push('/'));
    }

    if (chats && receiver) {
      const chat: IChat = findChatByReceiver(chats, receiver);
      if (chat && chat.fired) {
        if (findChatIdByReceiver(chats, receiver) !== '')
          dispatch(
            sendChatFired(!chat.fired, findChatIdByReceiver(chats, receiver))
          );
      }
    }
  }

  if (action.type === ChatsActionTypes.SEND_FIRE_SUCCESS) {
    store.dispatch(fetchChats());
  }

  return next(action);
};
