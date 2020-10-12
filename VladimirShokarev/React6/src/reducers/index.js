import { combineReducers } from "redux";
import { chatsReducer } from "./chats";
import { profileReducer } from "./profile";
import { connectRouter } from "connected-react-router";

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer,
});