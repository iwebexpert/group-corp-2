import { createAction } from "redux-api-middleware";

export const CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST";
export const CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS";
export const CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE";

export const ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST";
export const ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS";
export const ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE";

export const CHAT_DELETE = "CHAT_DELETE";

export const CHAT_FIRE_REQUEST = "CHAT_FIRE_REQUEST";
export const CHAT_FIRE_SUCCESS = "CHAT_FIRE_SUCCESS";
export const CHAT_FIRE_FAILURE = "CHAT_FIRE_FAILURE";

export const CHAT_UNFIRE_REQUEST = "CHAT_UNFIRE_REQUEST";
export const CHAT_UNFIRE_SUCCESS = "CHAT_UNFIRE_SUCCESS";
export const CHAT_UNFIRE_FAILURE = "CHAT_UNFIRE_FAILURE";

export const CLEAR_CHAT = "CLEAR_CHAT";

export const MESSAGE_SEND_REQUEST = "MESSAGE_SEND_REQUEST";
export const MESSAGE_SEND_SUCCESS = "MESSAGE_SEND_SUCCESS";
export const MESSAGE_SEND_FAILURE = "MESSAGE_SEND_FAILURE";

export const MESSAGE_DELETE_REQUEST = "MESSAGE_DELETE_REQUEST";
export const MESSAGE_DELETE_SUCCESS = "MESSAGE_DELETE_SUCCESS";
export const MESSAGE_DELETE_FAILURE = "MESSAGE_DELETE_FAILURE";

export const chatsLoadAction = () =>
  createAction({
    endpoint: "http://localhost:4000/chats?_embed=messages",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS, CHATS_LOAD_FAILURE],
  });

export const addChatAction = (chat) =>
  createAction({
    endpoint: "http://localhost:4000/chats",
    method: "POST",
    body: JSON.stringify(chat),
    headers: { "Content-Type": "application/json" },
    types: [ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS, ADD_CHAT_FAILURE],
  });

export const chatDeleteAction = (chatId) => ({
  type: CHAT_DELETE,
  payload: chatId,
});

export const chatFireAction = (chatId) =>
  createAction({
    endpoint: `http://localhost:4000/chats/${chatId}`,
    method: "PATCH",
    body: JSON.stringify({ fire: true }),
    headers: { "Content-Type": "application/json" },
    types: [CHAT_FIRE_REQUEST, CHAT_FIRE_SUCCESS, CHAT_FIRE_FAILURE],
  });

export const chatUnfireAction = (chatId) =>
  createAction({
    endpoint: `http://localhost:4000/chats/${chatId}`,
    method: "PATCH",
    body: JSON.stringify({ fire: false }),
    headers: { "Content-Type": "application/json" },
    types: [CHAT_UNFIRE_REQUEST, CHAT_UNFIRE_SUCCESS, CHAT_UNFIRE_FAILURE],
  });

export const clearChatAction = (chatId) => ({
  type: CLEAR_CHAT,
  payload: chatId,
});

export const chatsMessageSendAction = (message) =>
  createAction({
    endpoint: "http://localhost:4000/messages",
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [MESSAGE_SEND_REQUEST, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAILURE],
  });

export const messageDeleteAction = (id) =>
  createAction({
    endpoint: `http://localhost:4000/messages/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    types: [
      MESSAGE_DELETE_REQUEST,
      MESSAGE_DELETE_SUCCESS,
      MESSAGE_DELETE_FAILURE,
    ],
  });
