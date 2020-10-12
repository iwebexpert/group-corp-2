export const CHATS_LOAD = "CHATS_LOAD";
export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND";
export const CHATS_ADD = "CHATS_ADD";
export const FIRE_CHAT = "FIRE_CHAT";
export const UNFIRE_CHAT = "UNFIRE_CHAT";
export const DELETE_CHAT = "DELETE_CHAT";

export const chatsLoadAction = () => ({
  type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
  type: CHATS_MESSAGE_SEND,
  payload: message,
});

export const chatsAddAction = (chatId, title) => ({
  type: CHATS_ADD,
  payload: { chatId, title },
});

export const fireChatAction = (chatId, fire) => ({
  type: FIRE_CHAT,
  payload: { chatId, fire },
});

export const unfireChatAction = (chatId, fire) => ({
  type: UNFIRE_CHAT,
  payload: { chatId, fire },
});

export const deleteChatAction = (chatId) => ({
  type: DELETE_CHAT,
  payload:  chatId,
});
