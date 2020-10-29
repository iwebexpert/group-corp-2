import chats from './messenger/reducer';
import profile from './profile/reducer';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';


export const reducers = (history) => combineReducers({
  router: connectRouter(history),
  chats,
  profile,
});