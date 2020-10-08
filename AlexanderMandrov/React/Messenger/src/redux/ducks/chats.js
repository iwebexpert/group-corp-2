import update from 'immutability-helper';
import { createPrimaryChats } from '../../constants/constants';
import { createMessage, createBotMessage } from '../../utils/utils';

const SET_CHATS = 'chats/SET_CHATS',
  SET_SEND_MESSAGE = 'chats/SET_SEND_MESSAGE',
  SET_SEND_BOT_MESSAGE = 'chats/SET_SEND_BOT_MESSAGE',
  SET_NEW_CHAT = 'chats/SET_NEW_CHAT';

const initialState = {
  chats: null,
  receiver: null
};

const setChats = (chats) => ({
  type: SET_CHATS,
  chats
});

const setSendMessage = (messageText, sender, chatId) => ({
  type: SET_SEND_MESSAGE,
  payload: {
    text: messageText,
    username: sender,
    chatId
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
    default:
      return state;    
  }
};

export default chatsReducer;
export { fetchChats, setSendMessage, setNewChat, setChats, setSendBotMessage };