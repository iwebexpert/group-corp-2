import {Reducer} from 'redux';
import {Actions, Types, ChatsPayload, MessagesPayload} from './../actions/chats';

export type ChatsReducerState = {
  items : Array<ChatsPayload> | null ,
  isChatsLoading : boolean,
  isChatsError : boolean,
  isMessagesError : boolean,
  isMessagesLoading : boolean
};
const initialState : ChatsReducerState = {
  items: null,
  isChatsLoading: false,
  isChatsError: false,
  isMessagesError: false,
  isMessagesLoading: false,
};

export const chats : Reducer<ChatsReducerState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CHATS:
      return {
        ...state,
        items: action.payload,
      };
    case Types.ADD_CHAT:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case Types.SET_CHATS_LOADING:
      return {
        ...state,
        isChatsLoading: action.payload,
      };
    case Types.SET_CHATS_ERROR:
      return {
        ...state,
        isChatsError: action.payload,
      };
    case Types.SET_MESSAGES_ERROR:
      return {
        ...state,
        isMessagesError: action.payload,
      };
    case Types.SET_MESSAGES_LOADING:
      return {
        ...state,
        isMessagesLoading: action.payload,
      };
    case Types.FIRE_CHAT:
      return {
        ...state,
        items: state.items.map((chat : ChatsPayload) => {
          if (chat.id === action.chatId) {
            chat.fire = true;
          }
          return chat;
        }),
      };
    case Types.UNFIRE_CHAT:
      return {
        ...state,
        items: state.items.map((chat : ChatsPayload) => {
          chat.fire = false;
          return chat;
        }),
      };
    case Types.REMOVE_CHAT:
      return {
        ...state,
        items: state.items.filter((item : ChatsPayload) => item.id !== action.payload),
      };
    case Types.SEND_MESSAGE:
      return {
        ...state,
        items: state.items.map((item : ChatsPayload) => {
          if (item.id === action.payload.chatId) {
            item.messages = [...item.messages, action.payload.obj];
          }
          return item;
        }),
      };
    case Types.EDIT_CHAT:
      return {
        ...state,
        items: state.items.map((item : ChatsPayload) => {
          if (item.id === action.payload.chatId) {
            item.title = action.payload.newTitle;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
