import { createAction } from 'redux-api-middleware';
import { createMessage, createBotMessage } from '../../utils/utils';
import { API_URL } from '../../constants/constants';

const FETCH_CHATS_REQUEST = 'chats/FETCH_CHATS_REQUEST',
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
  SET_RECEIVER = 'chats/SET_RECEIVER';

const initialState = {
  chats: null,
  receiver: null,
  loading: false,
  error: false
};

export const fetchChats = () => createAction({
  endpoint: `${API_URL}chats?_embed=messages`,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_FAILURE
  ]
});

export const sendMessage = (messageText, sender, chatId) => createAction({
  endpoint: `${API_URL}messages`,
  method: 'POST',
  body: JSON.stringify(createMessage(messageText, sender, chatId)),
  headers: { 'Content-Type': 'application/json' },
  types: [
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE
  ]
});

export const sendBotMessage = (sender, receiver, chatId) => createAction({
  endpoint: `${API_URL}messages`,
  method: 'POST',
  body: JSON.stringify(createBotMessage(sender, receiver, chatId)),
  headers: { 'Content-Type': 'application/json' },
  types: [
    SEND_BOT_MESSAGE_REQUEST,
    SEND_BOT_MESSAGE_SUCCESS,
    SEND_BOT_MESSAGE_FAILURE
  ]
});

export const sendNewChat = (chat) => createAction({
  endpoint: `${API_URL}chats`,
  method: 'POST',
  body: JSON.stringify(chat),
  headers: { 'Content-Type': 'application/json' },
  types: [
    SEND_NEW_CHAT_REQUEST,
    SEND_NEW_CHAT_SUCCESS,
    SEND_NEW_CHAT_FAILURE
  ]
});

export const sendChatFired = (fire, chatId) => createAction({
  endpoint: `${API_URL}chats/${chatId}`,
  method: 'PATCH',
  body: JSON.stringify({fired: fire}),
  headers: { 'Content-Type': 'application/json' },
  types: [
    SEND_FIRE_REQUEST,
    SEND_FIRE_SUCCESS,
    SEND_FIRE_FAILURE
  ]
});

export const deleteMessage = (messageId) => createAction({
  endpoint: `${API_URL}messages/${messageId}`,
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  types: [
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE
  ]
});

export const setReceiver = (receiver) => ({
  type: SET_RECEIVER,
  receiver
});

const chatsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      }
    case FETCH_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload
      }
    case FETCH_CHATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case SET_RECEIVER:
      return {
        ...state,
        receiver: action.receiver
      }
    default:
      return state;    
  }
};

export default chatsReducer;
export { SEND_MESSAGE_SUCCESS, SEND_BOT_MESSAGE_SUCCESS, SEND_BOT_MESSAGE_REQUEST, 
  SEND_FIRE_SUCCESS, SEND_NEW_CHAT_SUCCESS, DELETE_MESSAGE_SUCCESS };