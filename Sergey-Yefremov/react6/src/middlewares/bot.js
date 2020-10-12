import { nanoid } from "nanoid"
import { CHATS_MESSAGE_SEND, chatsMessageSendAction } from "../actions/chats"

export const botMiddleware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { chatId, author } = action.payload
    if (author !== "botSaySmth") {
      setTimeout(() => {
        store.dispatch(
          chatsMessageSendAction({
            chatId,
            author: "botSaySmth",
            text: `Hi, ${author}, I'm botSaySmth!`,
            id: nanoid(8),
          })
        )
      }, 3000)
    }
  }

  return next(action)
}
