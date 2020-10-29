import { chatUnfireAction } from '../actions/chats'

export const chatsUnfire = store => next => action => {
  if (action.type == "@@router/LOCATION_CHANGE") {
    if (action.payload != undefined) {
      if (action.payload.location.pathname.match(/[0-9]+/) != null) {
        const chatId = action.payload.location.pathname.match(/[0-9]+/)[0]
        store.dispatch(chatUnfireAction({ chatId }))
      }
    }
  }
  return next(action)
}
