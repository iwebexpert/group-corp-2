import axios from "axios";
import { Dispatch, ActionCreator } from 'redux'
export enum ChatsActionsTypes {
  SET_CHATS_LOADING = "SET_CHATS_LOADING",
  SET_CHATS_ERROR = "SET_CHATS_ERROR",
  SET_MESSAGES_LOADING = 'SET_MESSAGES_LOADING',
  SET_MESSAGES_ERROR = 'SET_MESSAGES_ERROR',
  SET_CHATS = 'SET_CHATS',
  ADD_CHAT = 'ADD_CHAT',
  REMOVE_CHAT = 'REMOVE_CHAT',
  EDIT_CHAT = 'EDIT_CHAT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  FIRE_CHAT = 'FIRE_CHAT',
  UNFIRE_CHAT = 'UNFIRE_CHAT'
};
export type setChatsLoading = {
  type: ChatsActionsTypes.SET_CHATS_LOADING;
  payload: boolean;
};

export type setChatsError = {
  type: ChatsActionsTypes.SET_CHATS_ERROR;
  payload: boolean;
};
export type setMessagesLoading = {
  type: ChatsActionsTypes.SET_MESSAGES_LOADING;
  payload: boolean;
};
export type setMessagesError = {
  type: ChatsActionsTypes.SET_MESSAGES_ERROR;
  payload: boolean;
};
export type setChats = {
  type : ChatsActionsTypes.SET_CHATS,
  payload : ChatsType
}
export type editChat = {
  type: ChatsActionsTypes.EDIT_CHAT;
  payload: editChatPayload;
};

export type removeChat = {
  type: ChatsActionsTypes.REMOVE_CHAT;
  payload: number;
};
export type fireChat = {
  type: ChatsActionsTypes.FIRE_CHAT;
  chatId: number;
};
export type unfireChat = {
  type: ChatsActionsTypes.UNFIRE_CHAT;
  payload: number;
};
export type addChat = {
  type: ChatsActionsTypes.ADD_CHAT;
  payload: ChatsType;
};

export type sendMessage = {
  type: ChatsActionsTypes.SEND_MESSAGE;
  payload: {
    obj: MessagesType;
    chatId: number;
    author: string;
  };
};
export type ChatsType = {
  title: string;
  messages: Array<MessagesType>;
  fire: boolean;
  id: number;
};
export type MessagesType = {
  id: number;
  chatId: number;
  author: string;
  message: string;
};
export type editChatPayload = {
  newTitle: string;
  chatId: number;
};
export type ChatsActions = sendMessage | addChat | removeChat | fireChat | unfireChat | editChat | setChatsLoading | setChatsError | setMessagesLoading | setMessagesError | setChats;
export const setChatsLoading: ActionCreator<setChatsLoading> = (payload: boolean) => ({
  type: ChatsActionsTypes.SET_CHATS_LOADING,
  payload,
});
export const setChatsError: ActionCreator<setChatsError> = (payload: boolean) => ({
  type: ChatsActionsTypes.SET_CHATS_ERROR,
  payload,
});
export const setMessagesLoading: ActionCreator<setMessagesLoading> = (payload: boolean) => ({
  type: ChatsActionsTypes.SET_MESSAGES_LOADING,
  payload,
});
export const setMessagesError: ActionCreator<setMessagesError> = (payload: boolean) => ({
  type: ChatsActionsTypes.SET_MESSAGES_ERROR,
  payload,
});
export const setChats : ActionCreator<setChats> = (chats: ChatsType) => ({
  type: ChatsActionsTypes.SET_CHATS,
  payload: chats,
});
export const addChat = (chat: ChatsType) => ({
  type: ChatsActionsTypes.ADD_CHAT,
  payload: chat,
});
export const removeChat: ActionCreator<removeChat> = (chatId: number) => ({
  type: ChatsActionsTypes.REMOVE_CHAT,
  payload: chatId,
});
export const editChat: ActionCreator<editChat> = (newTitle: string, chatId: number) => ({
  type: ChatsActionsTypes.EDIT_CHAT,
  payload: { newTitle, chatId },
});
export const sendMessage: ActionCreator<sendMessage> = (obj: MessagesType, chatId: number, author: string) => ({
  type: ChatsActionsTypes.SEND_MESSAGE,
  payload: { obj, chatId, author },
});
export const fireChat: ActionCreator<fireChat> = (chatId: number) => ({
  type: ChatsActionsTypes.FIRE_CHAT,
  chatId: chatId,
});
export const unfireChat: ActionCreator<unfireChat> = (chatId: number) => ({
  type: ChatsActionsTypes.UNFIRE_CHAT,
  payload: chatId,
});
export const fetchChats = () => (dispatch: Dispatch) => {
  dispatch(setChatsLoading(true));
  dispatch(setChatsError(false));
  dispatch(setMessagesLoading(true));
  dispatch(setMessagesError(false));
  axios
    .get<ChatsType>("http://localhost:3001/chats?_embed=messages")
    .then<void>(({ data }) => {
      dispatch(setChats(data));
      dispatch(setChatsLoading(false));
      dispatch(setMessagesLoading(false));
    })
    .catch<void>(() => {
      dispatch(setChatsError(true));
      dispatch(setMessagesError(true));
    });
};

export const addChatAction = (chat: ChatsType) => (dispatch: Dispatch) => {
  dispatch(setChatsLoading(true));
  axios.post<void>("http://localhost:3001/chats", chat).then<void>(() => {
    dispatch(addChat(chat));
    dispatch(setChatsLoading(false));
  });
};
export const sendMessageAction = (chatId: number, author: string, message: string) => (dispatch: Dispatch) => {
  dispatch(setMessagesLoading(true));
  dispatch(setMessagesError(false));
  axios
    .post<MessagesType>("http://localhost:3001/messages", {
      chatId: chatId,
      message: message,
      author: author,
    })
    .then<void>(({ data }) => {
      dispatch(sendMessage(data, chatId, author));
      dispatch(setMessagesLoading(false));
    })
    .catch<void>(() => {
      dispatch(setMessagesError(true));
    });
};
export const removeChatAction = (chatId: number) => (dispatch: Dispatch) => {
  dispatch(setChatsError(false));
  dispatch(setChatsLoading(true));
  axios
    .delete<void>(`http://localhost:3001/chats/${chatId}`)
    .then<void>(() => {
      dispatch(removeChat(chatId));
      dispatch(setChatsLoading(false));
    })
    .catch<void>(() => {
      dispatch(setChatsError(true));
    });
};
export const editChatAction = (newTitle: string, chatId: number) => (dispatch: Dispatch) => {
  dispatch(setChatsError(false));
  dispatch(setChatsLoading(true));
  axios
    .patch<void>(`http://localhost:3001/chats/${chatId}`, {
      title: newTitle,
    })
    .then<void>(() => {
      dispatch(editChat(newTitle, chatId));
      dispatch(setChatsLoading(false));
    })
    .catch<void>(() => {
      setChatsError(true);
    });
};

