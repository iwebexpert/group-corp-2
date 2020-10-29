import {
  createAction,
  RSAARequestTypeDescriptor,
  RSAASuccessTypeDescriptor,
  RSAAFailureTypeDescriptor,
} from 'redux-api-middleware';
import { ActionCreator, Reducer } from 'redux';
import { createMessage, createBotMessage } from '../../utils/utils';
import { API_URL } from '../../constants/constants';
import { IMessage, IChat } from '../../types/interfaces';

export enum ChatsActionTypes {
  FETCH_CHATS_REQUEST = 'chats/FETCH_CHATS_REQUEST',
  FETCH_CHATS_SUCCESS = 'chats/FETCH_CHATS_SUCCESS',
  FETCH_CHATS_FAILURE = 'chats/FETCH_CHATS_FAILURE',

  SEND_MESSAGE_REQUEST = 'chats/SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_SUCCESS = 'chats/SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_FAILURE = 'chats/SEND_MESSAGE_FAILURE',

  SEND_BOT_MESSAGE_REQUEST = 'chats/SEND_BOT_MESSAGE_REQUEST',
  SEND_BOT_MESSAGE_SUCCESS = 'chats/SEND_BOT_MESSAGE_SUCCESS',
  SEND_BOT_MESSAGE_FAILURE = 'chats/SEND_BOT_MESSAGE_FAILURE',

  SEND_FIRE_REQUEST = 'chats/SEND_FIRE_REQUEST',
  SEND_FIRE_SUCCESS = 'chats/SEND_FIRE_SUCCESS',
  SEND_FIRE_FAILURE = 'chats/SEND_FIRE_FAILURE',

  SEND_NEW_CHAT_REQUEST = 'chats/SEND_NEW_CHAT_REQUEST',
  SEND_NEW_CHAT_SUCCESS = 'chats/SEND_NEW_CHAT_SUCCESS',
  SEND_NEW_CHAT_FAILURE = 'chats/SEND_NEW_CHAT_FAILURE',

  DELETE_MESSAGE_REQUEST = 'chats/DELETE_MESSAGE_REQUEST',
  DELETE_MESSAGE_SUCCESS = 'chats/DELETE_MESSAGE_SUCCESS',
  DELETE_MESSAGE_FAILURE = 'chats/DELETE_MESSAGE_FAILURE',

  SET_RECEIVER = 'chats/SET_RECEIVER',
}

export type ChatsReducerState = {
  chats: null | Array<IChat>;
  receiver: null | string;
  loading: boolean;
  error: boolean;
};

const initialState: ChatsReducerState = {
  chats: null,
  receiver: null,
  loading: false,
  error: false,
};

export const fetchChats = () =>
  createAction({
    endpoint: `${API_URL}chats?_embed=messages`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      ChatsActionTypes.FETCH_CHATS_REQUEST,
      ChatsActionTypes.FETCH_CHATS_SUCCESS,
      ChatsActionTypes.FETCH_CHATS_FAILURE,
    ],
  });

export const sendMessage = (
  messageText: IMessage['text'],
  sender: IMessage['username'],
  chatId: string
) =>
  createAction({
    endpoint: `${API_URL}messages`,
    method: 'POST',
    body: JSON.stringify(createMessage(messageText, sender, chatId)),
    headers: { 'Content-Type': 'application/json' },
    types: [
      ChatsActionTypes.SEND_MESSAGE_REQUEST,
      ChatsActionTypes.SEND_MESSAGE_SUCCESS,
      ChatsActionTypes.SEND_MESSAGE_FAILURE,
    ],
  });

export const sendBotMessage = (
  sender: IMessage['username'],
  receiver: string,
  chatId: string
) =>
  createAction({
    endpoint: `${API_URL}messages`,
    method: 'POST',
    body: JSON.stringify(createBotMessage(sender, receiver, chatId)),
    headers: { 'Content-Type': 'application/json' },
    types: [
      ChatsActionTypes.SEND_BOT_MESSAGE_REQUEST,
      ChatsActionTypes.SEND_BOT_MESSAGE_SUCCESS,
      ChatsActionTypes.SEND_BOT_MESSAGE_FAILURE,
    ],
  });

export const sendNewChat = (chat: IChat) =>
  createAction({
    endpoint: `${API_URL}chats`,
    method: 'POST',
    body: JSON.stringify(chat),
    headers: { 'Content-Type': 'application/json' },
    types: [
      ChatsActionTypes.SEND_NEW_CHAT_REQUEST,
      ChatsActionTypes.SEND_NEW_CHAT_SUCCESS,
      ChatsActionTypes.SEND_NEW_CHAT_FAILURE,
    ],
  });

export const sendChatFired = (fire: boolean, chatId: string) =>
  createAction({
    endpoint: `${API_URL}chats/${chatId}`,
    method: 'PATCH',
    body: JSON.stringify({ fired: fire }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      ChatsActionTypes.SEND_FIRE_REQUEST,
      ChatsActionTypes.SEND_FIRE_SUCCESS,
      ChatsActionTypes.SEND_FIRE_FAILURE,
    ],
  });

export const deleteMessage = (messageId: string) =>
  createAction({
    endpoint: `${API_URL}messages/${messageId}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    types: [
      ChatsActionTypes.DELETE_MESSAGE_REQUEST,
      ChatsActionTypes.DELETE_MESSAGE_SUCCESS,
      ChatsActionTypes.DELETE_MESSAGE_FAILURE,
    ],
  });

export type setReceiverAction = {
  type: ChatsActionTypes.SET_RECEIVER;
  payload: string;
};

export const setReceiver: ActionCreator<setReceiverAction> = (
  receiver: string
) => ({
  type: ChatsActionTypes.SET_RECEIVER,
  payload: receiver,
});

type ChatsActions =
  | setReceiverAction
  | RSAASuccessTypeDescriptor
  | RSAAFailureTypeDescriptor
  | RSAARequestTypeDescriptor;

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ChatsActionTypes.FETCH_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ChatsActionTypes.FETCH_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
      };
    case ChatsActionTypes.FETCH_CHATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ChatsActionTypes.SET_RECEIVER:
      return {
        ...state,
        receiver: action.payload,
      };
    default:
      return state;
  }
};
