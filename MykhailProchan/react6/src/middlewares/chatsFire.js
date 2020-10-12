import { CHATS_FIRE, chatFireAction, CHATS_UNFIRE, chatUnfireAction } from '../actions/chats'

export const chatsFire = store => next => action => {
  if (action.type === CHATS_FIRE) {
    if (action.payload.author === 'BattleMech' && store.router.location.pathname.match(/[0-9]+/) != action.payload.chatId) {
      store.dispatch(chatFireAction({
        chatId
      }))
    }
  }
  return next(action)
}

export const chatsUnfire = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const chatId = store.router.location.pathname.match(/[0-9]+/)
    store.dispatch(chatUnfireAction({ chatId }))
  }
  return next(action)
}