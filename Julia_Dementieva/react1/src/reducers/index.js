import {combineReducers} from 'redux';

import {chatsReducer} from './chats';
import {aboutReducer} from './about';

export const rootReducer = combineReducers({
    chats: chatsReducer,
    about: aboutReducer, 
});