import update from 'react-addons-update'

import {
  CHATS_LOAD_REQUEST,
  CHATS_LOAD_SUCCESS,
  CHATS_LOAD_FAILURE,
  CHATS_MESSAGE_SEND,
  ADD_CHAT,
  CHATS_FIRE,
  CHATS_UNFIRE
} from '../actions/chats'

const initialState = {
  entries: {},
  loading: false
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      }

    case CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload
      }

    case CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }

    case CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload
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
      return update(state, {
        entries: {
          $push: [{
            id: action.payload.id,
            name: action.payload.name,
            fire: false,
            messages: action.payload.messages
          }]
        }
      })

    case CHATS_FIRE:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: true }
          }
        }
      })

    case CHATS_UNFIRE:
      if (state.entries == {}) return null
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: false }
          }
        }
      })

    default:
      return state
  }
}