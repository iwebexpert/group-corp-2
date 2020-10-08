export const CHATS_LOAD = 'CHATS_LOAD';
export const NEW_CHAT_ADD = 'NEW_CHAT_ADD';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export const chatsLoad = () => ({
  type: CHATS_LOAD,
});

export const newChatAdd = (newChat) => ({
  type: NEW_CHAT_ADD,
  payload: newChat,
});

export function setMessage(message) {
  return {
    type: NEW_MESSAGE,
    payload: message,
  };
}
