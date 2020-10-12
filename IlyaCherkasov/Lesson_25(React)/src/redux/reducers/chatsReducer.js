import update from 'react-addons-update';

import {
  CHATS_LOAD,
  NEW_MESSAGE,
  NEW_CHAT_ADD,
  CHAT_FIRE,
  CHAT_UNFIRE,
  DELETE_CHAT,
} from '../actions/chatActions';

const initialState = {
  entries: {},
};

import { chats } from '../../helpers/chatsData';

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      return {
        ...state,
        entries: chats,
      };
    case NEW_CHAT_ADD:
      return update(state, {
        entries: {
          $push: [
            {
              title: action.payload.title,
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