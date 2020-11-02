import { createAction } from 'redux-api-middleware';
import { ActionCreator } from 'redux';

import { NewChatType } from '../../types'

export enum ChatsActionType {
  CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
  CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
  CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

  CHATS_POST_REQUEST = 'CHATS_POST_REQUEST',
  CHATS_POST_SUCCESS = 'CHATS_POST_SUCCESS',
  CHATS_POST_FAILURE = 'CHATS_POST_FAILURE',

  CHAT_FIRE = 'CHAT_FIRE',
  CHAT_UNFIRE = 'CHAT_UNFIRE',

  NEW_MESSAGE = 'NEW_MESSAGE',

  DELETE_CHAT = 'DELETE_CHAT',
}

export type setChatFireAction = {
  type: ChatsActionType.CHAT_FIRE;
  payload: boolean;
}

export const setChatFire: ActionCreator<setChatFireAction> = (chatFire: boolean) => ({
  type: ChatsActionType.CHAT_FIRE,
  payload: chatFire,
});

export type setChatUnFireAction = {
  type: ChatsActionType.CHAT_UNFIRE;
  payload: boolean;
}

export const setChatUnFire: ActionCreator<setChatUnFireAction> = (chatUnFire: boolean) => ({
  type: ChatsActionType.CHAT_UNFIRE,
  payload: chatUnFire,
})

export type deleteChatAction = {
  type: ChatsActionType.DELETE_CHAT;
  payload: any;
}

export const deleteChat: ActionCreator<deleteChatAction> = (newChatList: any) => ({
  type: ChatsActionType.DELETE_CHAT,
  payload: newChatList,
})

export type setMessageAction = {
  type: ChatsActionType.NEW_MESSAGE;
  payload: any
}

export const setMessage: ActionCreator<setMessageAction> = (message: any) => ({
  type: ChatsActionType.NEW_MESSAGE,
  payload: message,
});

export const chatsLoadAction = () => createAction({
  endpoint: 'http://localhost:4000/chats?_embed=messages',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    ChatsActionType.CHATS_LOAD_REQUEST,
    ChatsActionType.CHATS_LOAD_SUCCESS,
    ChatsActionType.CHATS_LOAD_FAILURE,
  ],
});

export const chatsPostAction = (newChat: NewChatType) => createAction({
  endpoint: 'http://localhost:4000/chats',
  method: 'POST',
  body: JSON.stringify(newChat),
  headers: { 'Content-Type': 'application/json' },
  types: [
    {
      type: ChatsActionType.CHATS_POST_REQUEST,
      payload: newChat,
    },
    {
      type: ChatsActionType.CHATS_POST_SUCCESS,
      payload: async (res: Response) => await res.json(),
    },
    ChatsActionType.CHATS_POST_FAILURE,
  ],
});