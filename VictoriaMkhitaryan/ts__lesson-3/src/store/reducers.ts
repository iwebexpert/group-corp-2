import { chatsReducer, ChatsReducerState } from './messenger/reducer';
import { profileReducer, ProfileReducerState } from './profile/reducer';
import { History } from 'history';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export type AppState = {
  chats: ChatsReducerState;
  profile: ProfileReducerState;
  [propName: string]: any;
};

export const reducers = (history: History) => combineReducers<AppState>({
  router: connectRouter(history),
  chats: chatsReducer,
  profile: profileReducer,
});