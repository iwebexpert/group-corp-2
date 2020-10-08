export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const ADD_CHAT = 'ADD_CHAT'

export const chatsLoadAction = () => ({
  type: CHATS_LOAD,
})

export const chatsMessageSendAction = (message) => ({
  type: CHATS_MESSAGE_SEND,
  payload: message,
})

export const addChatAction = (chat) => ({
  type: ADD_CHAT,
  payload: chat
})

//TODO action addChat