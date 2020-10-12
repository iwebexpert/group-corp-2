import { CHATS_FIRE, chatUnfireAction } from '../actions/chats'

export const chatsUnfire = store => next => action => {
  console.log(action.type)
  if (action.type === CHATS_FIRE || action.type == '@@router/LOCATION_CHANGE') {
    if (store.getState().router.location.pathname.match(/[0-9]+/)[0] == action.payload.chatId) {
      const chatId = action.payload.chatId
      console.log(chatId)
      store.dispatch(chatUnfireAction({ chatId }))
    }
  }
  return next(action)
}
