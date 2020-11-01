import {createAction, RequestError} from 'redux-api-middleware';
import {ActionCreator, Dispatch} from 'redux';

export enum ChatsActionTypes {
    CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
    CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
    CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

    CHAT_FIRE = "CHAT_FIRE",
    CHAT_UNFIRE = "CHAT_UNFIRE",

    CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST",
    CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS",
    CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE",

    ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST",
    ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS",
    ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE",
}

export type chatsLoadRequestAction = {
    type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};

export type chatFireAction = {
    type: ChatsActionTypes.CHAT_FIRE,
    payload: any,
};

export type chatUnfireAction = {
    type: ChatsActionTypes.CHAT_UNFIRE,
    payload: any,
};

export type chatsLoadSuccessAction = {
    type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
    payload: any;
};

export type chatsLoadFailureAction = {
    type: ChatsActionTypes.CHATS_LOAD_FAILURE;
    payload: RequestError;
    error: boolean;
};

export type chatsAddAction = {
    type: ChatsActionTypes.ADD_CHAT_SUCCESS | ChatsActionTypes.ADD_CHAT_REQUEST | ChatsActionTypes.ADD_CHAT_FAILURE;
    payload: ChatPayload;
};

export type chatsMessageSendAction = {
    type: ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS;
    payload: MessagePayload;
};

type ChatPayload = {
    chatId: number;
    title: string;
};

type MessagePayload = MessageType & {
    chatId: number;
};

//Все возможные действия
export type ChatsActions = chatsLoadRequestAction 
| chatsLoadSuccessAction 
| chatsLoadFailureAction 
| chatsAddAction
| chatsMessageSendAction
| chatFireAction
| chatUnfireAction;

export const chatsMessageSendAction = (message: MessageType) => createAction({
    endpoint: 'http://localhost:4000/messages',
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [
        ChatsActionTypes.CHATS_MESSAGE_SEND_REQUEST,
        ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS,
        ChatsActionTypes.CHATS_MESSAGE_SEND_FAILURE,
    ],
});

export const addChatAction = (chats: NewChatType) => createAction({
    endpoint: 'http://localhost:4000/chats',
    method: "POST",
    body: JSON.stringify(chats),
    headers: { "Content-Type": "application/json" },
    types: [
        ChatsActionTypes.ADD_CHAT_REQUEST,
        ChatsActionTypes.ADD_CHAT_SUCCESS,
        ChatsActionTypes.ADD_CHAT_FAILURE,
    ],
});

export const chatFireAction: ActionCreator<chatFireAction> = (id) => ({
    type: ChatsActionTypes.CHAT_FIRE,
    payload: id,
});

export const chatUnfireAction: ActionCreator<chatUnfireAction> = (id) => ({
    type: ChatsActionTypes.CHAT_UNFIRE,
    payload: id,
});

export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestAction> = () => ({
    type: ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessAction> = (data) => ({
    type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
    payload: data,
});

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureAction> = (error: RequestError) => ({
    type: ChatsActionTypes.CHATS_LOAD_FAILURE,
    payload: error,
    error: true,
});

export const chatsLoadAction = () => createAction({
    endpoint: `http://localhost:4000/chats?_embed=messages`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        ChatsActionTypes.CHATS_LOAD_REQUEST,
        ChatsActionTypes.CHATS_LOAD_SUCCESS,
        ChatsActionTypes.CHATS_LOAD_FAILURE,
    ],
});