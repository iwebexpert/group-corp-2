import axios from "axios";
export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND";
export const fetchChats = () => (dispatch) => {
  axios.get("http://localhost:3001/chats?_embed=messages").then(({ data }) => {
    dispatch(setChats(data));
  });
};
export const setChats = (chats) => ({
  type: "SET_CHATS",
  payload: chats,
});
export const addChat = (chat) => ({
  type: "ADD_CHAT",
  payload: chat,
});
export const removeChat = (id) => ({
  type: "REMOVE_CHAT",
  payload: id,
});
export const editChat = (newTitle, chatId) => ({
  type: "EDIT_CHAT",
  payload: { newTitle, chatId },
});
export const sendMessage = (obj, chatId, author, pathname) => ({
  type: "SEND_MESSAGE",
  payload: { obj, chatId, author, pathname },
});
export const fireChat = (pathname, chatId) => {
  return {
    type: "FIRE_CHAT",
    payload: { pathname, chatId },
  };
};
