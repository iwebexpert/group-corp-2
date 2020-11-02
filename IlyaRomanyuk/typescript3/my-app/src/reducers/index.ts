import { combineReducers } from "redux";
import { addChatReducer, ChatReducerState } from "./addChatReducer";
import { profileReducer, PersonReducerState } from "./profileReducer";
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export type AppState = {
    profile: PersonReducerState;
    chats: ChatReducerState,
    [propName: string]: any;
};

export const rootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    chats: addChatReducer,
    profile: profileReducer
})