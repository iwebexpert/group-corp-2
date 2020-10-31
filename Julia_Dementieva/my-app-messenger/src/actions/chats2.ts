import {createAction, RequestError} from 'redux-api-middleware';
import {ActionCreator} from 'redux';

export enum ChatsActionTypes {
    CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
    CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
    CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

    CHAT_ADD_REQUEST = 'CHAT_ADD_REQUEST',
    CHAT_ADD_SUCCESS = 'CHAT_ADD_SUCCESS',
    CHAT_ADD_FAILURE = 'CHAT_ADD_FAILURE',

    MESSAGE_ADD_REQUEST = 'MESSAGE_ADD_REQUEST',
    MESSAGE_ADD_SUCCESS = 'MESSAGE_ADD_SUCCESS',
    MESSAGE_ADD_FAILURE = 'MESSAGE_ADD_FAILURE',

    CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND',
    CHATSLISTS_SEND = 'CHATSLISTS_SEND',
    MESSAGE_UNFIRE = 'MESSAGE_UNFIRE',
    MESSAGE_FIRE = 'MESSAGE_FIRE',
};

export type chatsLoadRequestAction = {
    type: ChatsActionTypes.CHATS_LOAD_REQUEST;
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

export type chatsAddRequestAction = {
    type: ChatsActionTypes.CHAT_ADD_REQUEST;
};

export type chatsAddSuccessAction = {
    type: ChatsActionTypes.CHAT_ADD_SUCCESS;
    payload: any;
};

export type chatsAddFailureAction = {
    type: ChatsActionTypes.CHAT_ADD_FAILURE;
    payload: RequestError;
    error: boolean;
};

export type ChatAdd = {
    author: string;
    avatar: string;
    chatId: number;
};

type MessageAdd = {
    chatId: number;
    id: number;
    text: string;
    author: string;

};

export type chatsMessageSendAction = {
    type: ChatsActionTypes.CHATS_MESSAGE_SEND,
    payload: MessageAdd,
};

export type chatsListSendAction = {
    type: ChatsActionTypes.CHATSLISTS_SEND,
    payload: ChatAdd,
};

export type messageFireAction = {
    type: ChatsActionTypes.MESSAGE_FIRE,
    payload: any,
};

export type messageUnfireAction = {
    type: ChatsActionTypes.MESSAGE_UNFIRE,
    payload: any,
};


//Все возможные действия
export type ChatsActions = chatsLoadRequestAction 
| chatsLoadSuccessAction 
| chatsLoadFailureAction 
| chatsAddRequestAction
| chatsAddSuccessAction 
| chatsAddFailureAction
| chatsMessageSendAction
| chatsListSendAction
| messageFireAction
| messageUnfireAction;


//Middleware
export const chatsLoadAction = () => createAction({
    endpoint: 'http://localhost:4000/chats?_embed=messages',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
        ChatsActionTypes.CHATS_LOAD_REQUEST,
        ChatsActionTypes.CHATS_LOAD_SUCCESS,
        ChatsActionTypes.CHATS_LOAD_FAILURE,
    ],
});

export const chatsMessageSendAction: ActionCreator<chatsMessageSendAction> = (message: MessageAdd) => ({
    type: ChatsActionTypes.CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsListSendAction: ActionCreator<chatsListSendAction> = (chat: ChatAdd) => ({
    type: ChatsActionTypes.CHATSLISTS_SEND,
    payload: chat,
});

export const chatAddServerAction = (newchat: ChatAdd) => createAction({
    endpoint: 'http://localhost:4000/chats',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newchat),
    types: [
        ChatsActionTypes.CHAT_ADD_REQUEST,
        {
          type: ChatsActionTypes.CHAT_ADD_SUCCESS,
        //-----------------------------------------   Убрать any
          payload: async (res: any) => await res.json()
        },
        ChatsActionTypes.CHAT_ADD_FAILURE
      ]
});

export const messageAddServerAction = (newmessage: MessageAdd) => createAction({
    endpoint: 'http://localhost:4000/messages',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
            ...newmessage
        }),
    types: [
        {
            type: ChatsActionTypes.MESSAGE_ADD_REQUEST,
            payload: { ...newmessage}
        },
        {
            type: ChatsActionTypes.MESSAGE_ADD_SUCCESS,
            payload: async (res:any) => await res.json()
        },
        ChatsActionTypes.MESSAGE_ADD_FAILURE
        ]
});

export const messageFireAction: ActionCreator<messageFireAction> = (chatId: any) => ({
    type: ChatsActionTypes.MESSAGE_FIRE,
    payload: chatId,
});

export const messageUnfireAction: ActionCreator<messageUnfireAction> = (chatId: any) => ({
    type: ChatsActionTypes.MESSAGE_UNFIRE,
    payload: chatId,
});
