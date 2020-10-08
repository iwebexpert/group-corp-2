import {combineReducers} from 'redux';

import {chatsReducer} from './chats';
import {profileReducer} from "./user";

export const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
});