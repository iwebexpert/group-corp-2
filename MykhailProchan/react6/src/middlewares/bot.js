import { CHATS_MESSAGE_SEND, chatsMessageSendAction, chatFireAction } from '../actions/chats'
import React from 'react'

let timer

export const botMiddleware = store => next => action => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { author, chatId } = action.payload
    if (author !== 'BattleMech') {
      clearTimeout(timer)
      timer = setTimeout(
        () => {
          store.dispatch(chatsMessageSendAction({
            text: <div>Привет, {author}!</div>,
            chatId,
            author: 'BattleMech'
          }));
          store.dispatch(chatFireAction({ chatId }))
        }, 3000)
    }
  }
  return next(action)
}