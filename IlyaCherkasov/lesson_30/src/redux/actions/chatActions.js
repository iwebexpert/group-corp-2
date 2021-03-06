import { createAction } from 'redux-api-middleware';

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';
export const CHATS_POST_SUCCESS = 'CHATS_POST_SUCCESS';

export const CHAT_FIRE = 'CHAT_FIRE';
export const CHAT_UNFIRE = 'CHAT_UNFIRE';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const DELETE_CHAT = 'DELETE_CHAT';

export const setChatFire = (newChat) => ({
  type: CHAT_FIRE,
  payload: newChat,
});

export const setChatUnFire = (newChat) => ({
  type: CHAT_UNFIRE,
  payload: newChat,
})

export const deleteChat = (newChat) => ({
  type: DELETE_CHAT,
  payload: newChat,
})

export const setMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});

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

export const chatsPostAction = (newChat) => createAction({
  endpoint: 'http://localhost:4000/chats',
  method: 'POST',
  body: JSON.stringify(newChat),
  headers: { 'Content-Type': 'application/json' },
  types: [
    CHATS_LOAD_REQUEST,
    CHATS_POST_SUCCESS,
    CHATS_LOAD_FAILURE,
  ],
});