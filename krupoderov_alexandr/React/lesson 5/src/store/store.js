import {createStore, combineReducers} from 'redux';
import {ChatReducer} from './ChatsReducer';
import ProfileReducer from './ProfileReducer';

const reducers = combineReducers({
		chats: ChatReducer,
		profile: ProfileReducer
});

export const store = createStore(reducers);
