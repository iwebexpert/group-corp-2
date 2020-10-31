import { createAction } from "redux-api-middleware";
import { ActionCreator } from "redux";
import { NewChatType } from "../types";
export const api = "http://localhost:4000";

export enum ChatsActionTypes {
    ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST",
    ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS",
    ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE",

    CHAT_FIRE = "CHAT_FIRE",
    CHAT_UNFIRE = "CHAT_UNFIRE",

    DELETE_CHAT_REQUEST = "DELETE_CHAT_REQUEST",
    DELETE_CHAT_SUCCESS = "DELETE_CHAT_SUCCESS",
    DELETE_CHAT_FAILURE = "DELETE_CHAT_FAILURE",

    CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST",
    CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS",
    CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE",
};

type ChatUnfireType = {
    id: number;
};

type ChatFireType = ChatUnfireType & {
    timer?: NodeJS.Timeout;
};

type chatFireActionType = {
    type: ChatsActionTypes.CHAT_FIRE;
    payload: ChatFireType;
};

type chatUnfireActionType = {
    type: ChatsActionTypes.CHAT_UNFIRE;
    payload: ChatUnfireType;
};

export const addChatAction = (chats: NewChatType) => createAction({
    endpoint: `${api}/chats`,
    method: "POST",
    body: JSON.stringify(chats),
    headers: { "Content-Type": "application/json" },
    types: [
        ChatsActionTypes.ADD_CHAT_REQUEST,
        ChatsActionTypes.ADD_CHAT_SUCCESS,
        ChatsActionTypes.ADD_CHAT_FAILURE,
    ],
});

export const deleteChatAction = (id: number) => createAction({

    endpoint: `${api}/chats/${id}?_embed=messages`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    types: [
        ChatsActionTypes.DELETE_CHAT_REQUEST,
        ChatsActionTypes.DELETE_CHAT_SUCCESS,
        ChatsActionTypes.DELETE_CHAT_FAILURE,
    ],
});

export const chatFireAction: ActionCreator<chatFireActionType> = (id: ChatUnfireType) => ({
    type: ChatsActionTypes.CHAT_FIRE,
    payload: id,
});

export const chatUnfireAction: ActionCreator<chatUnfireActionType> = (id: ChatUnfireType) => ({
    type: ChatsActionTypes.CHAT_UNFIRE,
    payload: id,
});

export const chatsLoadAction = () => createAction({
    endpoint: `${api}/chats?_embed=messages`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        ChatsActionTypes.CHATS_LOAD_REQUEST,
        ChatsActionTypes.CHATS_LOAD_SUCCESS,
        ChatsActionTypes.CHATS_LOAD_FAILURE,
    ],
});