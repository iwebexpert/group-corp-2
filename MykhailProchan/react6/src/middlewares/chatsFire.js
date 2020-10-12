import { CHATS_FIRE, CHATS_MESSAGE_SEND, chatFireAction, CHATS_UNFIRE, chatUnfireAction } from '../actions/chats'

export const chatsFire = store => next => action => {
  if (!/^\/$/.test(store.getState().router.location.pathname)) {
    console.log(store.getState().router.location.pathname.match(/[0-9]+/)[0])
    if (action.type === CHATS_MESSAGE_SEND) {
      if (action.payload.author === 'BattleMech' && store.getState().router.location.pathname.match(/[0-9]+/)[0] != action.payload.chatId) {
        store.dispatch(chatFireAction({
          chatId
        }))
      }
    }
  }
  return next(action)
}
