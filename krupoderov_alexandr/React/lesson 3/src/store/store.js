import {createStore, combineReducers} from 'redux';
import {MessageReducer} from './MessageReducer';
import {ChatReducer} from './ChatsReducer';
import UserReducer from './UserReducer';

const reducers = combineReducers({
		messagePage: MessageReducer,
		chats: ChatReducer,
		user: UserReducer
});

export const store = createStore(reducers);
