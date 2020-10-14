import axios from "axios";

export const fetchChats = () => (dispatch) => {
  dispatch(setChatsLoading(true));
  dispatch(setChatsError(false));
  axios
    .get("http://localhost:3001/chats?_embed=messages")
    .then(({ data }) => {
      dispatch(setChats(data));
      dispatch(setChatsLoading(false));
    })
    .catch(() => {
      dispatch(setChatsError(true));
    });
};

export const addChatAction = (chat) => (dispatch) => {
  dispatch(setChatsLoading(true));
  axios.post("http://localhost:3001/chats", chat).then(() => {
    dispatch(addChat(chat));
    dispatch(setChatsLoading(false));
  });
};
export const sendMessageAction = (chatId, author, message) => (dispatch) => {
  dispatch(setMessagesLoading(true));
  dispatch(setMessagesError(false));
  axios
    .post("http://localhost:3001/messages", {
      chatId: chatId,
      message: message,
      author: author,
    })
    .then(({ data }) => {
      dispatch(sendMessage(data, chatId, author));
      dispatch(setMessagesLoading(false));
    })
    .catch(() => {
      dispatch(setMessagesError(true));
    });
};
export const removeChatAction = (chatId) => (dispatch) => {
  dispatch(setChatsError(false));
  dispatch(setChatsLoading(true));
  axios
    .delete(`http://localhost:3001/chats/${chatId}`)
    .then(() => {
      dispatch(removeChat(chatId));
      dispatch(setChatsLoading(false));
    })
    .catch(() => {
      dispatch(setChatsError(true));
    });
};
export const editChatAction = (newTitle, chatId) => (dispatch) => {
  dispatch(setChatsError(false));
  dispatch(setChatsLoading(true));
  axios
    .patch(`http://localhost:3001/chats/${chatId}`, {
      title: newTitle,
    })
    .then(() => {
      dispatch(editChat(newTitle, chatId));
      dispatch(setChatsLoading(false));
    })
    .catch(() => {
      setChatsError(true);
    });
};
export const setChatsLoading = (payload) => ({
  type: "SET_CHATS_LOADING",
  payload,
});
export const setChatsError = (payload) => ({
  type: "SET_CHATS_ERROR",
  payload,
});
export const setMessagesLoading = (payload) => ({
  type: "SET_MESSAGES_LOADING",
  payload,
});
export const setMessagesError = (payload) => ({
  type: "SET_MESSAGES_ERROR",
  payload,
});
export const setChats = (chats) => ({
  type: "SET_CHATS",
  payload: chats,
});
export const addChat = (chat) => ({
  type: "ADD_CHAT",
  payload: chat,
});
export const removeChat = (chatId) => ({
  type: "REMOVE_CHAT",
  payload: chatId,
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
