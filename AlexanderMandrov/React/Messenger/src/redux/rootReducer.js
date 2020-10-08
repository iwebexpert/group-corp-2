import { combineReducers } from 'redux';
import chatsReducer from './ducks/chats';
import profileReducer from './ducks/profile';

const rootReducer = combineReducers({
  chatsReducer,
  profileReducer
});

export default rootReducer;