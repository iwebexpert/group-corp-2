import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { chatsReducer, ChatsReducerState } from './ducks/chats';
import { profileReducer, ProfileReducerState } from './ducks/profile';

export type AppState = {
  chatsReducer: ChatsReducerState;
  profileReducer: ProfileReducerState;
  router: RouterState;
};

const createRootReducer = (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
    chatsReducer,
    profileReducer,
  });

export { createRootReducer };
