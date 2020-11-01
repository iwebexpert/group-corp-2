import update from 'react-addons-update';
import { Reducer } from 'redux';
import { ChatsType } from '../../types';

import { ChatsActionType } from '../actions/chatActions';

export type ChatsReducerState = {
  entries: {} | ChatsType[];
  loading: boolean;
  error: boolean;
  postLoading: boolean;
  postError: boolean;
}

const initialState: ChatsReducerState = {
  entries: {},
  loading: false,
  error: false,
  postLoading: false,
  postError: false,
};

export const chatsReducer: Reducer<ChatsReducerState> = (state = initialState, action): ChatsReducerState => {
  switch (action.type) {
    case ChatsActionType.CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ChatsActionType.CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };
    case ChatsActionType.CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ChatsActionType.CHATS_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
        postError: false
      }
    case ChatsActionType.CHATS_POST_SUCCESS:
      let idChat = +Object.keys(state.entries).pop()! + 1;
      return {
        ...state,
        entries: { ...state.entries, [idChat]: { ...action.chat } }
      }
    case ChatsActionType.CHATS_POST_FAILURE:
      return {
        ...state,
        postLoading: false,
        postError: true,
      };
    case ChatsActionType.NEW_MESSAGE:
      return update(state, {
        entries: {
          [action.payload.chatID]: {
            messages: {
              $push: [
                {
                  id: action.payload.id,
                  text: action.payload.text,
                  author: action.payload.author,
                  user: action.payload.user,
                },
              ],
            },
          },
        },
      });
    case ChatsActionType.CHAT_FIRE:
      return update(state, {
        entries: {
          [action.payload.chatID]: {
            $merge: {
              fire: true,
            },
          },
        },
      });
    case ChatsActionType.CHAT_UNFIRE:
      return update(state, {
        entries: {
          [action.payload.chatID]: {
            $merge: {
              fire: false,
            },
          },
        },
      });
    case ChatsActionType.DELETE_CHAT:
      let entries = Object.values(state.entries).filter((e) => e.id != action.payload.chatID);
      return update(state, {
        $set: {
          entries,
          loading: false,
          error: false,
          postLoading: false,
          postError: false,
        }
      });
    default:
      return state;
  }
};