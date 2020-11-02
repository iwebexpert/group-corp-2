import { RequestError } from 'redux-api-middleware';
import * as typesData from '../../types/types';

export enum ChatsActionTypes {
  SEND_MESSAGE = 'chats.SEND_MESSAGE',
  ADD_CHAT = 'chats.ADD_CHAT',
  DELETE_CHAT = 'chats.DELETE_CHAT',
  DELETE_MESSAGE = 'chats.DELETE_MESSAGE',
  ADD_UNREAD_MESSAGE = 'chats.ADD_UNREAD_MESSAGE',
  REMOVE_UNREAD_MESSAGE = 'chats.REMOVE_UNREAD_MESSAGE',

  CHATS_LOAD_REQUEST = 'chats.CHATS_LOAD_REQUEST',
  CHATS_LOAD_SUCCESS = 'chats.CHATS_LOAD_SUCCESS',
  CHATS_LOAD_FAILURE = 'chats.CHATS_LOAD_FAILURE',

  SEND_MESSAGE_SUCCESS = 'chats.SEND_MESSAGE_SUCCESS',
}

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

export type addUnreadMessage = {
  type: ChatsActionTypes.ADD_UNREAD_MESSAGE;
  chatId: number;
};

export type removeUnreadMessage = {
  type: ChatsActionTypes.REMOVE_UNREAD_MESSAGE;
  chatId: number;
};

export type sendMessageSuccess = {
  type: ChatsActionTypes.SEND_MESSAGE_SUCCESS;
  payload: RequestError;
};

export type sendMessageLocal = {
  type: ChatsActionTypes.SEND_MESSAGE;
  payload: typesData.MessageType;
};

export type addChatSuccess = {
  type: ChatsActionTypes.ADD_CHAT;
  payload: typesData.NewChatType;
};

export type deleteChat = {
  type: ChatsActionTypes.DELETE_CHAT;
  index: number;
};

export type deleteMessageByChatId = {
  type: ChatsActionTypes.DELETE_MESSAGE;
  findMessage: typesData.MessageType;
  chatId: number;
};

export type ChatActions = chatsLoadRequestAction | 
                          chatsLoadSuccessAction | 
                          chatsLoadFailureAction |
                          addUnreadMessage       |
                          removeUnreadMessage    |
                          sendMessageSuccess     |
                          sendMessageLocal       |
                          addChatSuccess         |
                          deleteChat             |
                          deleteMessageByChatId;