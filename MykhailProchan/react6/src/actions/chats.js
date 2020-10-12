export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const ADD_CHAT = 'ADD_CHAT'
export const CHATS_FIRE = 'CHATS_FIRE'
export const CHATS_UNFIRE = 'CHATS_UNFIRE'

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

export const chatFireAction = (chat) => ({
  type: CHATS_FIRE,
  payload: chat
})

export const chatUnfireAction = (chat) => ({
  type: CHATS_UNFIRE,
  payload: chat
})