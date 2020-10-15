import update from "react-addons-update";

import {
  // CHATS_LOAD,
  CHAT_LOAD_REQUEST,
  CHAT_LOAD_SUCCESS,
  CHAT_LOAD_FAILURE,
  CHATS_MESSAGE_SEND_REQUEST,
  CHATS_MESSAGE_SEND_SUCCESS,
  CHATS_MESSAGE_SEND_FAILURE,
  CHATS_MESSAGE_SEND,
  CHATSLISTS_SEND,
  MESSAGE_FIRE,
  MESSAGE_UNFIRE,
} from "../actions/chats";

const initialState = {
  entries: {},
  loading: null,
  fireChatsId: [],
};

import { chats } from "../helpers/chatsData";

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LOAD_REQUEST:
      return {
        ...state,
        loadStatus: "loading",
      };
    case CHAT_LOAD_SUCCESS:
      return {
        ...state,
        loadStatus: "loaded",
        entries: action.payload,
        fireChatsId: Array(action.payload.length).fill(false),
      };

    case CHAT_LOAD_FAILURE:
      return {
        ...state,
        loadStatus: null,
      };

    case CHATS_MESSAGE_SEND:
      //react-addons-update
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $push: [
                {
                  id: action.payload.id,
                  text: action.payload.text,
                  author: action.payload.author,
                },
              ],
            },
          },
        },
      });
    case CHATSLISTS_SEND:
      const newId = Object.keys(state.entries).length;
      return update(state, {
        entries: {
          $push: [
            {
              id: newId,
              author: action.payload.author,
              avatar: action.payload.avatar,
              messages: [],
            },
          ],
        },
      });

    case MESSAGE_FIRE:
      return update(state, {
        fireChatsId: {
          [+action.payload.chatId]: { $set: true },
        },
      });

    case MESSAGE_UNFIRE:
      return update(state, {
        fireChatsId: {
          [+action.payload.chatId]: { $set: false },
        },
      });

    default:
      return state;
  }
};
