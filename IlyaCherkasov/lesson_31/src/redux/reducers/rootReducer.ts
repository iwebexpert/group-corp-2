import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { chatsReducer, ChatsReducerState } from './chatsReducer';
import { profileReducer, profileReducerState } from './profileReducer';
// import { ProfileActionType } from '../actions/profileActions';

export type AppState = {
  chats: ChatsReducerState;
  profile: profileReducerState;
  [propName: string]: any;
}

export const rootReducer = (history: History) => combineReducers<AppState>({
  router: connectRouter(history),
  chats: chatsReducer,
  profile: profileReducer,
});