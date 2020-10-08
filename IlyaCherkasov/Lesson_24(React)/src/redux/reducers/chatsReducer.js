import update from 'react-addons-update';

import { CHATS_LOAD, NEW_MESSAGE, NEW_CHAT_ADD } from '../actions/chatActions';

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
              id: action.payload.id,
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
                  text: action.payload.text,
                  author: action.payload.author,
                  user: action.payload.user,
                  id: action.payload.id,
                },
              ],
            },
          },
        },
      });

    default:
      return state;
  }
};
