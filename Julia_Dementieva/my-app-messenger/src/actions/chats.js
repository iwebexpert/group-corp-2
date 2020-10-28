// export const CHATS_LOAD = 'CHATS_LOAD';
import {createAction} from 'redux-api-middleware';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';

export const CHAT_ADD_REQUEST = 'CHAT_ADD_REQUEST';
export const CHAT_ADD_SUCCESS = 'CHAT_ADD_SUCCESS';
export const CHAT_ADD_FAILURE = 'CHAT_ADD_FAILURE';

export const MESSAGE_ADD_REQUEST = 'MESSAGE_ADD_REQUEST';
export const MESSAGE_ADD_SUCCESS = 'MESSAGE_ADD_SUCCESS';
export const MESSAGE_ADD_FAILURE = 'MESSAGE_ADD_FAILURE';

export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATSLISTS_SEND = 'CHATSLISTS_SEND';
export const MESSAGE_UNFIRE = 'MESSAGE_UNFIRE';
export const MESSAGE_FIRE = 'MESSAGE_FIRE';


//Middleware
export const chatsLoadAction = () => createAction({
    endpoint: 'http://localhost:4000/chats?_embed=messages',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
        CHATS_LOAD_REQUEST,
        CHATS_LOAD_SUCCESS,
        CHATS_LOAD_FAILURE,
    ],
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsListSendAction = (chat) => ({
    type: CHATSLISTS_SEND,
    payload: chat,
});

export const chatAddServerAction = (newchat) => createAction({
    endpoint: 'http://localhost:4000/chats',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newchat),
    types: [
        CHAT_ADD_REQUEST,
        {
          type: CHAT_ADD_SUCCESS,
          payload: async (res) => await res.json()
        },
        CHAT_ADD_FAILURE
      ]
});

export const messageAddServerAction = (newmessage) => createAction({
    endpoint: 'http://localhost:4000/messages',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
            ...newmessage
        }),
    types: [
        {
            type: MESSAGE_ADD_REQUEST,
            payload: { ...newmessage}
        },
        {
            type: MESSAGE_ADD_SUCCESS,
            payload: async (res) => await res.json()
        },
        MESSAGE_ADD_FAILURE
        ]
});

export const messageFireAction = (chatId) => ({
    type: MESSAGE_FIRE,
    payload: chatId,
});

export const messageUnfireAction = (chatId) => ({
    type: MESSAGE_UNFIRE,
    payload: chatId,
});
