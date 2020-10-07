export const ADD_CHAT = '@@chat/ADD_CHAT';
export const DELETE_CHAT = '@@chat/DELETE_CHAT';
export const BLINK_CHAT = '@@message/BLINK_MESSAGE';

export const addChat = title => ({
  type: ADD_CHAT,
  title,
});

export const deleteChat = chatId => ({
  type: DELETE_CHAT,
  chatId,
});

export const blinkChat = (chatId, isOn) => ({
  type: BLINK_CHAT,
  chatId,
  isOn,
});