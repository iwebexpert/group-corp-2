import update from "react-addons-update";

import {
  CHATS_LOAD,
  CHATS_MESSAGE_SEND,
  ADD_CHAT,
  CHAT_FIRE,
  CHAT_UNFIRE,
  MESSAGE_DELETE,
  CLEAR_CHAT,
  CHAT_DELETE,
} from "../actions/chats";

const initialState = {
  entries: [],
  loading: false,
};

import { chats } from "../helpers/chatsData";

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      return {
        ...state,
        entries: chats,
      };
    case CHATS_MESSAGE_SEND:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $push: [
                {
                  id: action.payload.id,
                  text: action.payload.text,
                  author: action.payload.author,
                  time: action.payload.time,
                  chatId: action.payload.chatId,
                },
              ],
            },
          },
        },
      });
    case ADD_CHAT:
      return update(state, {
        entries: { $push: [action.payload.chat] },
      });
    case CHAT_FIRE:
      return update(state, {
        entries: {
          [action.payload]: {
            fire: {
              $set: true,
            },
          },
        },
      });

    case CHAT_UNFIRE:
      return update(state, {
        entries: {
          [action.payload]: {
            fire: {
              $set: false,
            },
          },
        },
      });

    case MESSAGE_DELETE:
      let messageIndex = state.entries
        .find((chat) => chat.chatId == action.payload.chatId)
        .messages.findIndex((message) => message.id == action.payload.id);
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $splice: [[messageIndex, 1]],
            },
          },
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

    case CHAT_DELETE:
      let chatIndex = state.entries.findIndex(
        (chat) => chat.chatId == action.payload
      );
      return update(state, {
        entries: {
          $splice: [[chatIndex, 1]],
        },
      });

    default:
      return state;
  }
};
