import { combineReducers } from "redux";
import { chats } from "./chats";
import { profile } from "./profile";
import { connectRouter } from "connected-react-router";

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chats,
    profile,
  });
