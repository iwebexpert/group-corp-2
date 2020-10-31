import { Reducer } from "redux";
import { ChatsActions, ChatsActionsTypes, ChatsType } from "./../actions/chats";

export type ChatsReducerState = {
  items: any;
  isChatsLoading: boolean;
  isChatsError: boolean;
  isMessagesError: boolean;
  isMessagesLoading: boolean;
};
const initialState: ChatsReducerState = {
  items: null,
  isChatsLoading: false,
  isChatsError: false,
  isMessagesError: false,
  isMessagesLoading: false,
};

export const chats: Reducer<ChatsReducerState, ChatsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ChatsActionsTypes.SET_CHATS:
      return {
        ...state,
        items: action.payload,
      };
    case ChatsActionsTypes.ADD_CHAT:
      return {
        ...state,
        items: state.items && [...state.items, action.payload],
      };
    case ChatsActionsTypes.SET_CHATS_LOADING:
      return {
        ...state,
        isChatsLoading: action.payload,
      };
    case ChatsActionsTypes.SET_CHATS_ERROR:
      return {
        ...state,
        isChatsError: action.payload,
      };
    case ChatsActionsTypes.SET_MESSAGES_ERROR:
      return {
        ...state,
        isMessagesError: action.payload,
      };
    case ChatsActionsTypes.SET_MESSAGES_LOADING:
      return {
        ...state,
        isMessagesLoading: action.payload,
      };
    case ChatsActionsTypes.FIRE_CHAT:
      return {
        ...state,
        items:
          state.items &&
          state.items.map((chat: ChatsType) => {
            if (chat.id === action.chatId) {
              chat.fire = true;
            }
            return chat;
          }),
      };
    case ChatsActionsTypes.UNFIRE_CHAT:
      return {
        ...state,
        items:
          state.items &&
          state.items.map((chat: ChatsType) => {
            chat.fire = false;
            return chat;
          }),
      };
    case ChatsActionsTypes.REMOVE_CHAT:
      return {
        ...state,
        items:
          state.items &&
          state.items.filter((item: ChatsType) => item.id !== action.payload),
      };
    case ChatsActionsTypes.SEND_MESSAGE:
      return {
        ...state,
        items:
          state.items &&
          state.items.map((item: ChatsType) => {
            if (item.id === action.payload.chatId) {
              item.messages = [...item.messages, action.payload.obj];
            }
            return item;
          }),
      };
    case ChatsActionsTypes.EDIT_CHAT:
      return {
        ...state,
        items:
          state.items &&
          state.items.map((item: ChatsType) => {
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
