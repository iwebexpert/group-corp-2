import { CHATS_FIRE, chatFireAction, CHATS_UNFIRE, chatUnfireAction } from '../actions/chats'
import React from 'react'

export const chatsFire = store => next => action => {
  if (action.type === CHATS_FIRE) {
    const { chatId } = action.payload
    store.dispatch(chatFireAction({
      chatId
    }))
  } else if (action.type === CHATS_UNFIRE) {
    store.dispatch(chatFireAction({
      chatId
    }))
  }
  return next(action)
}

export const botMiddleware = store => next => action => {
  if (action.type === CHATS_MESSAGE_SEND) {

    const { author, chatId } = action.payload
    if (author !== 'BattleMech') {
      setTimeout(
        () => {
          store.dispatch(chatsMessageSendAction({
            text: <div>Привет, {author}!</div>,
            chatId,
            author: 'BattleMech'
          }));
        }, 3000)
    }
  }
  return next(action)
}