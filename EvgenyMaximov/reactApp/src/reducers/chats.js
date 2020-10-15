import update from "react-addons-update";

import {
  CHATS_LOAD_REQUEST,
  CHATS_LOAD_SUCCESS,
  CHATS_LOAD_FAILURE,
  ADD_CHAT_REQUEST,
  ADD_CHAT_SUCCESS,
  CLEAR_CHAT,
  CHAT_DELETE,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_DELETE_REQUEST,
  MESSAGE_DELETE_SUCCESS,
} from "../actions/chats";

const initialState = {
  entries: [],
  messages: [],
  loading: false,
  error: false,
  pending: false,
  chatAddWaiting: false,
  chatAdd: false,
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case MESSAGE_SEND_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case MESSAGE_SEND_SUCCESS:
      return { ...state, pending: false, messageSend: true };

    case MESSAGE_SEND_FAILURE:
      return {
        ...state,
        pending: false,
      };

    case MESSAGE_DELETE_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case MESSAGE_DELETE_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case ADD_CHAT_REQUEST:
      return {
        ...state,
        chatAddWaiting: true,
        addChat: false,
      };

    case ADD_CHAT_SUCCESS:
      return {
        ...state,
        chatAddWaiting: false,
        addChat: true,
      };

    case CHAT_DELETE:
      let chatIndex = state.entries.findIndex(
        (chat) => chat.chatId == action.payload
      );
      return update(state, {
        entries: {
          $splice: [[chatIndex, 1]],
        },
      });

    case CLEAR_CHAT:
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
