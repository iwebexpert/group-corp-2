import { createAction } from "redux-api-middleware";
export const api = "http://localhost:3000";
export const CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST";
export const CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS";
export const CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE";
export const ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST";
export const ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS";
export const ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE";
export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";
export const DELETE_CHAT_REQUEST = "DELETE_CHAT_REQUEST";
export const DELETE_CHAT_SUCCESS = "DELETE_CHAT_SUCCESS";
export const DELETE_CHAT_FAILURE = "DELETE_CHAT_FAILURE";
export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE";
export const CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST";
export const CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS";
export const CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE";

export const chatsMessageSendAction = (message) => createAction({
    endpoint: `${api}/messages`,
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [
        CHATS_MESSAGE_SEND_REQUEST,
        CHATS_MESSAGE_SEND_SUCCESS,
        CHATS_MESSAGE_SEND_FAILURE,
    ],
});

export const addChatAction = (chats) => createAction({
    endpoint: `${api}/chats`,
    method: "POST",
    body: JSON.stringify(chats),
    headers: { "Content-Type": "application/json" },
    types: [
        ADD_CHAT_REQUEST,
        ADD_CHAT_SUCCESS,
        ADD_CHAT_FAILURE,
    ],
});

export const deleteChatAction = (id) => createAction({

    endpoint: `${api}/chats/${id}?_embed=messages`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    types: [
        DELETE_CHAT_REQUEST,
        DELETE_CHAT_SUCCESS,
        DELETE_CHAT_FAILURE,
    ],
});

export const deleteMessageAction = (id) => createAction({

    endpoint: `${api}/messages/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    types: [
        DELETE_MESSAGE_REQUEST,
        DELETE_MESSAGE_SUCCESS,
        DELETE_MESSAGE_FAILURE,
    ],
});

export const chatFireAction = (id) => ({
    type: CHAT_FIRE,
    payload: id,
});

export const chatUnfireAction = (id) => ({
    type: CHAT_UNFIRE,
    payload: id,
});

export const chatsLoadAction = () => createAction({
    endpoint: `${api}/chats?_embed=messages`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        CHATS_LOAD_REQUEST,
        CHATS_LOAD_SUCCESS,
        CHATS_LOAD_FAILURE,
    ],
});