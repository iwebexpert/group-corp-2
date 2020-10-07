export const ADD_NEW_CHAT = 'ADD-NEW-CHAT';
export const LOAD_CHATS = 'LOAD-CHATS';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';

export const addChatAC = (chat) => ({ type: ADD_NEW_CHAT, chat })
export const loadChatsAC = () => ({ type: LOAD_CHATS })
export const addMessageAC = (message) => ({ type: ADD_NEW_MESSAGE, payload: message })