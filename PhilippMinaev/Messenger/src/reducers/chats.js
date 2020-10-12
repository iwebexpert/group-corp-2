import update from "react-addons-update";

import {
  CHATS_LOAD,
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
    case CHATS_LOAD:
      return {
        ...state,
        entries: chats,
        loading: true,
        fireChatsId: Array(chats.length).fill(false),
      };
    case CHATS_MESSAGE_SEND:
      //react-addons-update
      console.log("send", state.fireChatsId);
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
