import { ChatsActionTypes, chatsMessageSendAction, chatFireAction } from '../actions/chats'

let timer: NodeJS.Timeout

export const botMiddleware = store => next => action => {
  if (action.type === ChatsActionTypes.CHATS_MESSAGE_SEND) {
    const { author, chatId } = action.payload
    if (author !== 'BattleMech') {
      clearTimeout(timer)
      timer = setTimeout(
        () => {
          store.dispatch(chatsMessageSendAction({
            text: `Привет, ${author}!`,
            chatId,
            author: 'BattleMech'
          }));
          if (store.getState().router.location.pathname.match(/[0-9]+/)[0] !== action.payload.chatId) store.dispatch(chatFireAction({ chatId }))
        }, 3000)
    }
  }
  return next(action)
}