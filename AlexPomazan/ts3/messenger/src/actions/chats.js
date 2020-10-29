import { createAction } from "redux-api-middleware";

export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";

export const CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST";
export const CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS";
export const CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE";

export const CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST";
export const CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS";
export const CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE";
export const ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST";
export const ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS";
export const ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE";

export const chatsMessageSendAction = (message) =>
  createAction({
    endpoint: "http://localhost:4000/messages",
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [
      CHATS_MESSAGE_SEND_REQUEST,
      CHATS_MESSAGE_SEND_SUCCESS,
      CHATS_MESSAGE_SEND_FAILURE,
    ],
  });

export const addChatAction = (chats) =>
  createAction({
    endpoint: "http://localhost:4000/chats",
    method: "POST",
    body: JSON.stringify(chats),
    headers: { "Content-Type": "application/json" },
    types: [ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS, ADD_CHAT_FAILURE],
  });

export const chatFireAction = (chatId) => ({
  type: CHAT_FIRE,
  payload: chatId,
});

export const chatUnfireAction = (chatId) => ({
  type: CHAT_UNFIRE,
  payload: chatId,
});

export const chatsLoadAction = () =>
  createAction({
    endpoint: "http://localhost:4000/chats?_embed=messages",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS, CHATS_LOAD_FAILURE],
  });
