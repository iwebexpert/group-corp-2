import { combineReducers } from "redux";
import { chatsReducer } from "./chats";
import { profileReducer } from "./profile";
import { messagesReducer } from "./messages";
import { connectRouter } from "connected-react-router";
import { History } from "history";

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer,
    messages: messagesReducer,
});

export type RootState = ReturnType<typeof createRootReducer>;