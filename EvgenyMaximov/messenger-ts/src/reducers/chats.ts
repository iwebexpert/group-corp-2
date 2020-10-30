import update from "react-addons-update";
import {Reducer} from 'redux';

import {ChatsActionTypes} from "../actions/chatsActionTypes";

export type ChatsReducerState = {
	entries: ChatType[],
	loading: boolean,
	error: boolean,
	pending: boolean,
	messageSendError: boolean,
	chatAddWaiting: boolean,
	chatAdd: boolean,
	chatAddError: boolean,
};

const initialState: ChatsReducerState = {
  entries: [],
  loading: false,
  error: false,
  pending: false,
  messageSendError: false,
  chatAddWaiting: false,
  chatAdd: false,
  chatAddError: false,
};

export const chatsReducer:Reducer<ChatsReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case ChatsActionTypes.CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case ChatsActionTypes.CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case ChatsActionTypes.CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case ChatsActionTypes.MESSAGE_SEND_REQUEST:
      return {
        ...state,
        pending: true,
        messageSendError: false,
      };

    case ChatsActionTypes.MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        pending: false,
        messageSend: true,
      };

    case ChatsActionTypes.MESSAGE_SEND_FAILURE:
      return {
        ...state,
        pending: false,
        messageSendError: true,
      };

    case ChatsActionTypes.MESSAGE_DELETE_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case ChatsActionTypes.MESSAGE_DELETE_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case ChatsActionTypes.ADD_CHAT_REQUEST:
      return {
        ...state,
        chatAddWaiting: true,
        addChat: false,
        chatAddError: false,
      };

    case ChatsActionTypes.ADD_CHAT_SUCCESS:
      return {
        ...state,
        chatAddWaiting: false,
        addChat: true,
      };

    case ChatsActionTypes.ADD_CHAT_FAILURE:
      return {
        ...state,
        chatAddError: true,
      };

    case ChatsActionTypes.CHAT_DELETE:
      let chatIndex:number = state.entries.findIndex(
        (chat:ChatType) => chat.chatId === action.payload
      );
      return update(state, {
        entries: {
          $splice: [[chatIndex, 1]],
        },
      });

    case ChatsActionTypes.CLEAR_CHAT:
      return update(state, {
        entries: {
          [action.payload]: {
            messages: {
              $splice: [[0]],
            },
          },
        },
      });

    default:
      return state;
  }
};
