import { createAction } from "redux-api-middleware";
import {ActionCreator} from "redux";

import {ChatsActionTypes, ChatDeleteAction, ClearChatAction} from "./chatsActionTypes";

export const chatsLoadAction = () =>
  createAction({
    endpoint: "http://localhost:4000/chats?_embed=messages",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [ChatsActionTypes.CHATS_LOAD_REQUEST, ChatsActionTypes.CHATS_LOAD_SUCCESS, ChatsActionTypes.CHATS_LOAD_FAILURE],
  });

export const addChatAction = (chat:ChatType) =>
  createAction({
    endpoint: "http://localhost:4000/chats",
    method: "POST",
    body: JSON.stringify(chat),
    headers: { "Content-Type": "application/json" },
    types: [ChatsActionTypes.ADD_CHAT_REQUEST, ChatsActionTypes.ADD_CHAT_SUCCESS, ChatsActionTypes.ADD_CHAT_FAILURE],
  });

export const chatDeleteAction:ActionCreator<ChatDeleteAction> = (chatId:number) => ({
  type: ChatsActionTypes.CHAT_DELETE,
  payload: chatId,
});

export const chatFireAction = (chatId:number) =>
  createAction({
    endpoint: `http://localhost:4000/chats/${chatId}`,
    method: "PATCH",
    body: JSON.stringify({ fire: true }),
    headers: { "Content-Type": "application/json" },
    types: [ChatsActionTypes.CHAT_FIRE_REQUEST, ChatsActionTypes.CHAT_FIRE_SUCCESS, ChatsActionTypes.CHAT_FIRE_FAILURE],
  });

export const chatUnfireAction = (chatId:number) =>
  createAction({
    endpoint: `http://localhost:4000/chats/${chatId}`,
    method: "PATCH",
    body: JSON.stringify({ fire: false }),
    headers: { "Content-Type": "application/json" },
    types: [ChatsActionTypes.CHAT_UNFIRE_REQUEST, ChatsActionTypes.CHAT_UNFIRE_SUCCESS, ChatsActionTypes.CHAT_UNFIRE_FAILURE],
  });

export const clearChatAction:ActionCreator<ClearChatAction> = (chatId:number) => ({
  type: ChatsActionTypes.CLEAR_CHAT,
  payload: chatId,
});

export const chatsMessageSendAction = (message:MessageType) =>
  createAction({
    endpoint: "http://localhost:4000/messages",
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [ChatsActionTypes.MESSAGE_SEND_REQUEST, ChatsActionTypes.MESSAGE_SEND_SUCCESS, ChatsActionTypes.MESSAGE_SEND_FAILURE],
  });

export const messageDeleteAction = (id:string) =>
  createAction({
    endpoint: `http://localhost:4000/messages/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    types: [
      ChatsActionTypes.MESSAGE_DELETE_REQUEST,
		ChatsActionTypes. MESSAGE_DELETE_SUCCESS,
      ChatsActionTypes.MESSAGE_DELETE_FAILURE,
    ],
  });
