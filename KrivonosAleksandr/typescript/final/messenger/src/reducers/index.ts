import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import {History} from 'history';

// import {chatsReducer, ChatsReducerState} from './chats';
import {chatsReducer} from './chats';
import {profileReducer} from "./user";

export type AppState = {
    chats: any;
    [propName: string]: any;
};

export const createRootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer
});