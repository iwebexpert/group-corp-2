import { combineReducers } from "redux";
import { addChatReducer } from "./addChatReducer";
import { profileReducer } from "./profileReducer";

export const rootReducer = combineReducers({ chats: addChatReducer, profile: profileReducer })