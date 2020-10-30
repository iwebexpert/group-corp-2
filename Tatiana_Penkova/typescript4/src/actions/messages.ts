import { createAction } from "redux-api-middleware";
import { MessagesType } from "../types";
import { api } from "./chats";

export enum MessageActionTypes {
    CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST",
    CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS",
    CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE",

    MESSAGES_LOAD_REQUEST = "MESSAGES_LOAD_REQUEST",
    MESSAGES_LOAD_SUCCESS = "MESSAGES_LOAD_SUCCESS",
    MESSAGES_LOAD_FAILURE = "MESSAGES_LOAD_FAILURE",

    DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST",
    DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS",
    DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE",
};

export const chatsMessageLoadAction = () => createAction({
    endpoint: `${api}/messages`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        MessageActionTypes.MESSAGES_LOAD_REQUEST,
        MessageActionTypes.MESSAGES_LOAD_SUCCESS,
        MessageActionTypes.MESSAGES_LOAD_FAILURE,
    ],
});

export const chatsMessageSendAction = (message: MessagesType) => createAction({
    endpoint: `${api}/messages`,
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [
        MessageActionTypes.CHATS_MESSAGE_SEND_REQUEST,
        MessageActionTypes.CHATS_MESSAGE_SEND_SUCCESS,
        MessageActionTypes.CHATS_MESSAGE_SEND_FAILURE,
    ],
});

export const deleteMessageAction = (id: string) => createAction({

    endpoint: `${api}/messages/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    types: [
        MessageActionTypes.DELETE_MESSAGE_REQUEST,
        MessageActionTypes.DELETE_MESSAGE_SUCCESS,
        MessageActionTypes.DELETE_MESSAGE_FAILURE,
    ],
});

