import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import { chatsReducer, ChatsReducerState } from "./chats";
import { InitailProfileStateType } from "./profile";

import { profileReducer } from "./profile";

export type AppState = {
  chats: ChatsReducerState;
  profile: InitailProfileStateType;
  [propName: string]: any;
};

export const createRootReducer = (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer,
  });
