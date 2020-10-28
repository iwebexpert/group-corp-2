import { createAction } from "redux-api-middleware";
import { api } from "./chats";
export const CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST";
export const CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS";
export const CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE";
export const MESSAGES_LOAD_REQUEST = "MESSAGES_LOAD_REQUEST";
export const MESSAGES_LOAD_SUCCESS = "MESSAGES_LOAD_SUCCESS";
export const MESSAGES_LOAD_FAILURE = "MESSAGES_LOAD_FAILURE";
export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE";

export const chatsMessageLoadAction = () => createAction({
    endpoint: `${api}/messages`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        MESSAGES_LOAD_REQUEST,
        MESSAGES_LOAD_SUCCESS,
        MESSAGES_LOAD_FAILURE,
    ],
});

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

