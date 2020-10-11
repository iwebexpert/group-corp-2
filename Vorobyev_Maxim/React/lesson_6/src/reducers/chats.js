import update from 'react-addons-update';

import {
  CHATS_LOAD,
  CHATS_MESSAGE_SEND,
  CHATS_ADD,
} from '../actions/chats';

const initialState = {
  entries: {},
  loading: false,
};

import { chats } from '../helpers/chatsData';

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
            messages: { $push: [{ id: action.payload.id, text: action.payload.text, author: action.payload.author }] },
          },
        },
      });
    case CHATS_ADD:
      return update(state, {
        entries: {$push: [{id: state.entries.length, title: title, messages: [], contacts: []}]},
      });
    default:
      return state;
  }
};