import {createAction, RequestError} from 'redux-api-middleware';
import {ActionCreator} from 'redux';

import {MessageFullInfoType} from '../types/types';

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

type ChatAdd = {
    author: string;
    avatar: string;
    chatId: number;
};

type MessageFireOrUnfire = {
    chatId: number;
};


export type chatsMessageSendAction = {
    type: ChatsActionTypes.CHATS_MESSAGE_SEND,
    payload: MessageFullInfoType,
};

export type chatsListSendAction = {
    type: ChatsActionTypes.CHATSLISTS_SEND,
    payload: any,
};

export type messageFireAction = {
    type: ChatsActionTypes.MESSAGE_FIRE,
    payload: MessageFireOrUnfire,
};

export type messageUnfireAction = {
    type: ChatsActionTypes.MESSAGE_UNFIRE,
    payload: MessageFireOrUnfire,
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

export const chatsMessageSendAction: ActionCreator<chatsMessageSendAction> = (message: MessageFullInfoType) => ({
    type: ChatsActionTypes.CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsListSendAction: ActionCreator<chatsListSendAction> = (chat: any) => ({
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
          payload: async (res: Response) => await res.json()
        },
        ChatsActionTypes.CHAT_ADD_FAILURE
      ]
});

export const messageAddServerAction = (newmessage: MessageFullInfoType) => createAction({
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
            payload: async (res: Response) => await res.json()
        },
        ChatsActionTypes.MESSAGE_ADD_FAILURE
        ]
});

export const messageFireAction: ActionCreator<messageFireAction> = (chatId: MessageFireOrUnfire) => ({
    type: ChatsActionTypes.MESSAGE_FIRE,
    payload: chatId,
});

export const messageUnfireAction: ActionCreator<messageUnfireAction> = (chatId: MessageFireOrUnfire) => ({
    type: ChatsActionTypes.MESSAGE_UNFIRE,
    payload: chatId,
}); 
