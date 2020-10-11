export const CHATS_LOAD = "CHATS_LOAD";
export const ADD_CHAT = "ADD_CHAT";
export const CHAT_DELETE = "CHAT_DELETE";
export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";
export const CLEAR_CHAT = "CLEAR_CHAT";

export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND";
export const MESSAGE_DELETE = "MESSAGE_DELETE";

export const chatsLoadAction = () => ({
  type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
  type: CHATS_MESSAGE_SEND,
  payload: message,
});

export const addChatAction = (chat) => ({
  type: ADD_CHAT,
  payload: chat,
});

export const chatFireAction = (chatId) => ({
  type: CHAT_FIRE,
  payload: chatId,
});

export const chatUnfireAction = (chatId) => ({
  type: CHAT_UNFIRE,
  payload: chatId,
});

export const messageDeleteAction = (ids) => ({
  type: MESSAGE_DELETE,
  payload: ids,
});

export const clearChatAction = (chatId) => ({
  type: CLEAR_CHAT,
  payload: chatId,
});

export const chatDeleteAction = (chatId) => ({
  type: CHAT_DELETE,
  payload: chatId,
});
