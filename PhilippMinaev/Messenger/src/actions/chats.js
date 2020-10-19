import { createAction } from "redux-api-middleware";

export const CHAT_LOAD_REQUEST = "CHAT_LOAD_REQUEST";
export const CHAT_LOAD_SUCCESS = "CHAT_LOAD_SUCCESS";
export const CHAT_LOAD_FAILURE = "CHAT_LOAD_FAILURE";

export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND";
export const CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST";
export const CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS";
export const CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE";

export const CHATSLISTS_SEND = "CHATSLISTS_SEND";
export const MESSAGE_UNFIRE = "MESSAGE_UNFIRE";
export const MESSAGE_FIRE = "MESSAGE_FIRE";

export const chatsMessageSendAction = (message) => ({
  type: CHATS_MESSAGE_SEND,
  payload: message,
});

export const chatsListSendAction = (chat) => ({
  type: CHATSLISTS_SEND,
  payload: chat,
});

export const messageFireAction = (chatId) => ({
  type: MESSAGE_FIRE,
  payload: chatId,
});

export const messageUnfireAction = (chatId) => ({
  type: MESSAGE_UNFIRE,
  payload: chatId,
});

//MiddleWare
export const chatsLoadAction = () =>
  createAction({
    endpoint: "http://localhost:3000/chats?_embed=messages",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [CHAT_LOAD_REQUEST, CHAT_LOAD_SUCCESS, CHAT_LOAD_FAILURE],
  });

export const messageSendAction = (message) =>
  createAction({
    endpoint: "http://localhost:3000/messages",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...message }),
    types: [
      {
        type: CHATS_MESSAGE_SEND_REQUEST,
        payload: { ...message },
      },
      {
        type: CHATS_MESSAGE_SEND_SUCCESS,
        payload: async (res) => await res.json(),
      },
      CHATS_MESSAGE_SEND_FAILURE,
    ],
  });
