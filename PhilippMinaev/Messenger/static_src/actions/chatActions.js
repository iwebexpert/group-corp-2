export const ADD_CHAT = "@@chat/ADD_CHAT";

export const addChat = (title) => ({
  type: ADD_CHAT,
  title,
});
