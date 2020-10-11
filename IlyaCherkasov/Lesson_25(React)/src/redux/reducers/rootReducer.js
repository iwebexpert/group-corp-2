import { combineReducers } from 'redux';
import {connectRouter} from 'connected-react-router'

import { chatsReducer } from './chatsReducer';
import { profileReducer } from './profileReducer';

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  chats: chatsReducer,
  profile: profileReducer,
});