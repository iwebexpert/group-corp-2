export const CHATS_LOAD = 'CHATS_LOAD';
export const NEW_CHAT_ADD = 'NEW_CHAT_ADD';
export const CHAT_FIRE = 'CHAT_FIRE';
export const CHAT_UNFIRE = 'CHAT_UNFIRE';
export const DELETE_CHAT = 'DELETE_CHAT';

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const chatsLoad = () => ({
  type: CHATS_LOAD,
});

export const newChatAdd = (newChat) => ({
  type: NEW_CHAT_ADD,
  payload: newChat,
});

export const setChatFire = (newChat) => ({
  type: CHAT_FIRE,
  payload: newChat,
});

export const setChatUnFire = (newChat) => ({
  type: CHAT_UNFIRE,
  payload: newChat,
})

export const deleteChat = (newChat) => ({
  type: DELETE_CHAT,
  payload: newChat,
})

export const setMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});

export const deleteMessage = (newMessage) => ({
  type: DELETE_MESSAGE,
  payload: newMessage
})