import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import chatsReducer from './ducks/chats';
import profileReducer from './ducks/profile';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  chatsReducer,
  profileReducer
});

export default createRootReducer;