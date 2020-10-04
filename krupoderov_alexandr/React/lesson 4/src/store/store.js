import {createStore, combineReducers} from 'redux';
import {ChatReducer} from './ChatsReducer';
import UserReducer from './UserReducer';

const reducers = combineReducers({
		chats: ChatReducer,
		user: UserReducer
});

export const store = createStore(reducers);
