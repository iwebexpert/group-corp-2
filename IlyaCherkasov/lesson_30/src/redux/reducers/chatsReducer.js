import update from 'react-addons-update';

import {
  CHATS_LOAD_REQUEST,
  CHATS_LOAD_SUCCESS,
  CHATS_LOAD_FAILURE,
  CHATS_POST_SUCCESS,
  NEW_MESSAGE,
  CHAT_FIRE,
  CHAT_UNFIRE,
  DELETE_CHAT,
} from '../actions/chatActions';

const initialState = {
  entries: {},
  loading: false,
  error: false,
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
    case CHATS_POST_SUCCESS:
      return update(state, {
        loading: {
          $set: false,
        },
        entries: {
          $push: [
            {
              title: action.payload.title,
              fire: false,
              messages: [],
            },
          ],
        },
      });
    case NEW_MESSAGE:
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
    case CHAT_FIRE:
      return update(state, {
        entries: {
          [action.payload.chatID]: {
            $merge: {
              fire: true,
            },
          },
        },
      });
    case CHAT_UNFIRE:
      return update(state, {
        entries: {
          [action.payload.chatID]: {
            $merge: {
              fire: false,
            },
          },
        },
      });
    case DELETE_CHAT:
      return update(state, {
        entries: {
          $splice: [[[action.payload.chatID], 1]],
        },
      });
    default:
      return state;
  }
};