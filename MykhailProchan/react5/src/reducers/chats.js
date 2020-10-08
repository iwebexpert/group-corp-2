import update from 'react-addons-update'

import {
  CHATS_LOAD,
  CHATS_MESSAGE_SEND,
} from '../actions/chats'

const initialState = {
  entries: {},
  loading: false
}

import { chats } from '../helpers/chatsData'

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      return {
        ...state,
        entries: chats
      }

    case CHATS_MESSAGE_SEND:
      console.log(action.payload)


      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: { $push: [{ text: action.payload.text, author: action.payload.author }] },
          },
        },
      })

    default:
      return state
  }
}