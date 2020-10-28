import { createAction } from "redux-api-middleware";
export const api = "http://localhost:4000";
export const ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST";
export const ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS";
export const ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE";
export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";
export const DELETE_CHAT_REQUEST = "DELETE_CHAT_REQUEST";
export const DELETE_CHAT_SUCCESS = "DELETE_CHAT_SUCCESS";
export const DELETE_CHAT_FAILURE = "DELETE_CHAT_FAILURE";
export const CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST";
export const CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS";
export const CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE";

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