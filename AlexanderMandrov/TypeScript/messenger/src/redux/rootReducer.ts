import { combineReducers, AnyAction } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { chatsReducer, ChatsReducerState } from './ducks/chats';
import { profileReducer, ProfileReducerState } from './ducks/profile';
import { ThunkDispatch } from 'redux-thunk';

export type AppState = {
  chatsReducer: ChatsReducerState;
  profileReducer: ProfileReducerState;
  router: RouterState;
};

export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const createRootReducer = (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
    chatsReducer,
    profileReducer,
  });

export { createRootReducer };
