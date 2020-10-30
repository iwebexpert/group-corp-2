import { combineReducers } from "redux";
import { chats, ChatsReducerState } from "./chats";
import { profile } from "./profile";
import { connectRouter } from "connected-react-router";
import {History} from 'history';
export type AppState = {
  chats : ChatsReducerState,
  [propName : string] : any
}
export const createRootReducer = (history : History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
    chats,
    profile,
  });
