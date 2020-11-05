import update from 'react-addons-update'

import { ChatsActionTypes, ChatsActions } from '../actions/chats'
import { Reducer } from 'redux'

export type ChatsReducerState = {
  entries: any[] //ChatType[] & { messages: MessageType[] }, не смог убрать тут any
  loading: boolean,
  fire: boolean,
  error: boolean
}

const initialState: ChatsReducerState = {
  entries: [
    {
      //messages: [{author: 'ZXC', text: 'zxczx'}], относится к комментарию выше
      id: 0,
      name: '',
      fire: false,
    }
  ],
  loading: false,
  fire: false,
  error: false
}

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action) => {
  switch (action.type) {
    case ChatsActionTypes.CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      }

    case ChatsActionTypes.CHATS_LOAD_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        entries: action.payload
      }

    case ChatsActionTypes.CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }

    case ChatsActionTypes.CHATS_LOAD_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        entries: action.payload
      }

    case ChatsActionTypes.CHATS_MESSAGE_SEND:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: { $push: [{ text: action.payload.text, author: action.payload.author }] },
          },
        },
      })

    case ChatsActionTypes.ADD_CHAT:
      const { id, name, messages } = action.payload
      return update(state, {
        entries: {
          $push: [{
            id: id,
            name: name,
            fire: false,
            messages: messages
          }] as any[] // я не понял этот момент, работает исключительно с as any[], нагуглить не смог
        }
      })

    case ChatsActionTypes.CHATS_FIRE:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: true }
          }
        }
      })

    case ChatsActionTypes.CHATS_UNFIRE:
      if (state.entries == []) return null
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