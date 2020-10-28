import { combineReducers } from "redux";
import { addChatReducer } from "./addChatReducer";
import { profileReducer } from "./profileReducer";

import { connectRouter } from 'connected-react-router'

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    chats: addChatReducer,
    profile: profileReducer
})