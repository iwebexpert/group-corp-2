import update from 'immutability-helper';
import { createPrimaryChats } from '../../constants/constants';
import { createMessage, createBotMessage } from '../../utils/utils';

const SET_CHATS = 'chats/SET_CHATS',
  SET_SEND_MESSAGE = 'chats/SET_SEND_MESSAGE',
  SET_SEND_BOT_MESSAGE = 'chats/SET_SEND_BOT_MESSAGE',
  SET_NEW_CHAT = 'chats/SET_NEW_CHAT',
  SET_FIRE_CHAT = 'chats/SET_FIRE_CHAT',
  SET_RECEIVER = 'chats/SET_RECEIVER';

const initialState = {
  chats: null,
  receiver: null
};

const setChats = (chats) => ({
  type: SET_CHATS,
  chats
});

const setSendMessage = (messageText, sender, chatId, receiver) => ({
  type: SET_SEND_MESSAGE,
  payload: {
    text: messageText,
    username: sender,
    chatId,
    receiver
  }
});

const setSendBotMessage = (sender, receiver, chatId) => ({
  type: SET_SEND_BOT_MESSAGE,
  payload: {
    sender,
    receiver,
    chatId
  }
});

const setNewChat = (chat) => ({
  type: SET_NEW_CHAT,
  chat
});

const setFireChat = (fire, chatId) => ({
  type: SET_FIRE_CHAT,
  payload: {
    fired: fire,
    chatId
  }
});

const setReceiver = (receiver) => ({
  type: SET_RECEIVER,
  receiver
});

const fetchChats = (usernames) => {
  return async (dispatch) => {
    const rawChats = await createPrimaryChats(usernames);
    if (rawChats) {
      dispatch(setChats(rawChats));
    }
  }
};

const chatsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CHATS:
      return {
        ...state,
        chats: action.chats
      }
    case SET_SEND_MESSAGE:
      return update(state, {
        chats: {
          [action.payload.chatId]: {
            messages: {$push: [
              createMessage(action.payload.text, action.payload.username)
            ]}
          }
        }
      });
    case SET_SEND_BOT_MESSAGE: 
      return update(state, {
        chats: {
          [action.payload.chatId]: {
            messages: {$push: [
              createBotMessage(action.payload.sender, action.payload.receiver)
            ]}
          }
        }
      });
    case SET_NEW_CHAT:
      return {
        ...state,
        chats: [action.chat, ...state.chats]
      }
    case SET_FIRE_CHAT:
      return {
        ...state,
        chats: state.chats.map((chat, idx) => {
          if (idx === action.payload.chatId) chat.fired = action.payload.fired;
          return chat
        })
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
export { fetchChats, setSendMessage, setNewChat, setChats, setSendBotMessage, SET_SEND_MESSAGE, SET_SEND_BOT_MESSAGE, setFireChat, setReceiver };