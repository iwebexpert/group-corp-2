import {combineReducers} from 'redux';

import {chatsReducer} from './chats';
import {aboutReducer} from './about';
import {robotReducer} from './robot';

export const rootReducer = combineReducers({
    chats: chatsReducer,
    about: aboutReducer, 
    robot: robotReducer,
});