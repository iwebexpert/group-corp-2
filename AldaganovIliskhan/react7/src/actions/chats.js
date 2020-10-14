import axios from "axios";
export const setLoading = (payload) => ({
  type: "SET_LOADING",
  payload,
});
export const setError = (payload) => ({
  type: "SET_ERROR",
  payload,
});
export const fetchChats = () => (dispatch) => {
  dispatch(setLoading(false));
  axios
    .get("http://localhost:3001/chats?_embed=messages")
    .then(({ data }) => {
      dispatch(setChats(data));
      dispatch(setLoading(true));
    })
    .catch((e) => {
      dispatch(setError(e));
    });
};

export const setChats = (chats) => ({
  type: "SET_CHATS",
  payload: chats,
});
export const addChat = (chat) => {
  return {
    type: "ADD_CHAT",
    payload: chat,
  };
};
export const removeChat = (id) => ({
  type: "REMOVE_CHAT",
  payload: id,
});
export const editChat = (newTitle, chatId) => ({
  type: "EDIT_CHAT",
  payload: { newTitle, chatId },
});
export const sendMessage = (obj, chatId, author) => ({
  type: "SEND_MESSAGE",
  payload: { obj, chatId, author },
});
export const fireChat = (chatId) => ({
  type: "FIRE_CHAT",
  chatId: chatId,
});
export const unfireChat = (chatId) => ({
  type: "UNFIRE_CHAT",
  payload: chatId,
});
export const addChatAction = (chat) => (dispatch) => {
  dispatch(setLoading(false));
  axios.post("http://localhost:3001/chats", chat).then(() => {
    dispatch(addChat(chat));
    dispatch(setLoading(true));
  });
};
