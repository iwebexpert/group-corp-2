export const CHATS_LOAD = 'CHATS_LOAD';
export const NEW_CHAT_ADD = 'NEW_CHAT_ADD';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const CHAT_FIRE = 'CHAT_FIRE';
export const CHAT_UNFIRE = 'CHAT_UNFIRE';

export const chatsLoad = () => ({
  type: CHATS_LOAD,
});

export const newChatAdd = (newChat) => ({
  type: NEW_CHAT_ADD,
  payload: newChat,
});

export const setMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});

export const setChatFire = (newChat) => ({
  type: CHAT_FIRE,
  payload: newChat,
});

export const setChatUnFire = (newChat) => ({
  type: CHAT_UNFIRE,
  payload: newChat,
})