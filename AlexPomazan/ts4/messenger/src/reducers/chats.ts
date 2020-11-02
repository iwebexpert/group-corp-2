import update from "react-addons-update";

import { Reducer } from "redux";
import { ChatsActions, ChatsActionTypes } from "../actions/chats";

export type ChatsReducerState = {
  entries: any;
  loading: boolean;
  error: boolean;
};

const initialState: ChatsReducerState = {
  entries: {},
  loading: false,
  error: false,
};

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (
  state = initialState,
  action
) => {
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

    case ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $push: [
                {
                  id: action.payload.id,
                  author: action.payload.author,
                  img: action.payload.img,
                  text: action.payload.text,
                },
              ],
            },
          },
        },
      });

    case ChatsActionTypes.ADD_CHAT_SUCCESS:
      const { chatId, title } = action.payload;
      return update(state, {
        entries: {
          $merge: {
            [chatId]: {
              id: chatId,
              title,
              fire: false,
              messages: [],
            },
          },
        },
      });

    case ChatsActionTypes.CHAT_FIRE:
      return update(state, {
        entries: {
          [action.payload]: {
            fire: {
              $set: true,
            },
          },
        },
      });

    case ChatsActionTypes.CHAT_UNFIRE:
      return update(state, {
        entries: {
          [action.payload]: {
            fire: {
              $set: false,
            },
          },
        },
      });
    default:
      return state;
  }
};
