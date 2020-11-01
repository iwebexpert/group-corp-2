import {combineReducers } from 'redux';
import allChatsReducer, {ChatsReducerState} from './allChatsReducer';
import activeChatReducer from './activeChatReducer';
import profileReducer, {ProfileReducerState} from './profileReducer';
import { connectRouter } from 'connected-react-router';
import {History} from 'history';

export type AppState = {
    allChats: ChatsReducerState;
    profile: ProfileReducerState;
    activeChat: string;
    [propName: string]: any;
  };
const createRootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    allChats: allChatsReducer,
    activeChat: activeChatReducer,
    profile: profileReducer
});

export default createRootReducer;