import update from 'react-addons-update'

import {
  CHATS_LOAD,
  CHATS_MESSAGE_SEND,
  ADD_CHAT,
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
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: { $push: [{ text: action.payload.text, author: action.payload.author }] },
          },
        },
      })

    case ADD_CHAT:
      console.log(action.payload)
      return update(state, {
        entries: {
          $push: [{
            id: action.payload.id,
            name: action.payload.name,
            messages: action.payload.messages
          }]
        }
      })

    default:
      return state
  }
}