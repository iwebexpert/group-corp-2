// export const CHATS_LOAD = 'CHATS_LOAD';
import {createAction} from 'redux-api-middleware';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';

export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATSLISTS_SEND = 'CHATSLISTS_SEND';
export const MESSAGE_UNFIRE = 'MESSAGE_UNFIRE';
export const MESSAGE_FIRE = 'MESSAGE_FIRE';

// export const chatsLoadAction = () => ({
//     type: CHATS_LOAD,
// });

//Middleware
export const chatsLoadAction = () => createAction({
    endpoint: 'http://localhost:3000/chats?_embed=messages',
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

export const messageFireAction = (chatId) => ({
    type: MESSAGE_FIRE,
    payload: chatId,
});

export const messageUnfireAction = (chatId) => ({
    type: MESSAGE_UNFIRE,
    payload: chatId,
});
