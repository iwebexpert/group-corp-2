import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { chatsReducer } from './chats'

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  chats: chatsReducer
})