import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import {History} from 'history';

import {chatsReducer, ChatsReducerState} from './chats';
import {profileReducer, ProfileReducerState} from "./user";

export type AppState = {
    chats: ChatsReducerState;
    profile: ProfileReducerState;
    [propName: string]: any;
};

export const createRootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer
});