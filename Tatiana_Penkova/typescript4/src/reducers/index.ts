import { combineReducers } from "redux";
import { chatsReducer } from "./chats";
import { profileReducer } from "./profile";
import { messagesReducer } from "./messages";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { InitailProfileStateType, InitialChatStateType, InitialMessagesType } from "../types";

type AppState = {
    chats: InitialChatStateType;
    profile: InitailProfileStateType;
    messages: InitialMessagesType;
    [propName: string]: any;
};

export const createRootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer,
    messages: messagesReducer,
});

export type RootState = ReturnType<typeof createRootReducer>;