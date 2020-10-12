export const ADD_NEW_CHAT = 'ADD-NEW-CHAT';
export const LOAD_CHATS = 'LOAD-CHATS';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
export const IS_FETCHING = 'IS-FETCHING';
export const CHAT_FIRE = 'CHAT-FIRE';
export const CHAT_UNFIRE = 'CHAT-UNFIRE';
export const DELETE_CHAT = 'DELETE-CHAT';
export const CLEAN_ALL_MESSAGES = 'CLEAN_ALL_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const addChatAC = (chat) => ({ type: ADD_NEW_CHAT, chat });
export const loadChatsAC = () => ({ type: LOAD_CHATS });
export const addMessageAC = (message) => ({ type: ADD_NEW_MESSAGE, payload: message });
export const isFetchingAC = (bool) => ({ type: IS_FETCHING, bool });

export const fireChatAC = (chatId) => ({ type: CHAT_FIRE, chatId });
export const unfireChatAC = (chatId) => ({ type: CHAT_UNFIRE, chatId });
export const deleteChatAC = (chatId) => ({ type: DELETE_CHAT, chatId });
export const cleanAllMessagesAC = (chatId) => ({ type: CLEAN_ALL_MESSAGES, chatId });
export const deleteMessageAC = (chatId, messageId) => ({ type: DELETE_MESSAGE, chatId, messageId });