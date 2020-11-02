import update from "react-addons-update";
import { Reducer } from "redux";

import { ChatsActionTypes, ChatsActions } from "../actions/chats";

export type ChatsReducerState = {
  entries: any;
  loadStatus: string | null;
  error: boolean;
  fireChatsId: Array<boolean>;
};

const initialState: ChatsReducerState = {
  entries: {},
  loadStatus: null,
  error: false,
  fireChatsId: [],
};

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ChatsActionTypes.CHAT_LOAD_REQUEST:
      return {
        ...state,
        loadStatus: "loading",
        error: false,
      };
    case ChatsActionTypes.CHAT_LOAD_SUCCESS:
      return {
        ...state,
        loadStatus: "loaded",
        entries: action.payload,
        fireChatsId: Array(action.payload.length).fill(false),
      };

    case ChatsActionTypes.CHAT_LOAD_FAILURE:
      return {
        ...state,
        loadStatus: null,
        error: true,
      };

    case ChatsActionTypes.CHATS_MESSAGE_SEND:
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

    case ChatsActionTypes.CHATSLISTS_SEND:
      return update(state, {
        entries: {
          $merge: {
            [action.payload.id]: {
              id: action.payload.id,
              title: action.payload.title,
              avatar: action.payload.avatar,
              messages: [],
            },
          },
        },
      });

    case ChatsActionTypes.MESSAGE_FIRE:
      return update(state, {
        fireChatsId: {
          [+action.payload.chatId]: { $set: true },
        },
      });

    case ChatsActionTypes.MESSAGE_UNFIRE:
      return update(state, {
        fireChatsId: {
          [+action.payload.chatId]: { $set: false },
        },
      });

    default:
      return state;
  }
};
