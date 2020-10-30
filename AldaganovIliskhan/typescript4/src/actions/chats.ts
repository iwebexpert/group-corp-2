import axios from "axios";
import { Dispatch, ActionCreator } from 'redux'
export enum Types {
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
  type: Types.SET_CHATS_LOADING;
  payload: boolean;
};

export type setChatsError = {
  type: Types.SET_CHATS_ERROR;
  payload: boolean;
};
export type setMessagesLoading = {
  type: Types.SET_MESSAGES_LOADING;
  payload: boolean;
};
export type setMessagesError = {
  type: Types.SET_MESSAGES_ERROR;
  payload: boolean;
};
export type setChats = {
  type : Types.SET_CHATS,
  payload : ChatsPayload
}
export type editChat = {
  type: Types.EDIT_CHAT;
  payload: editChatPayload;
};

export type removeChat = {
  type: Types.REMOVE_CHAT;
  payload: number;
};
export type fireChat = {
  type: Types.FIRE_CHAT;
  chatId: number;
};
export type unfireChat = {
  type: Types.UNFIRE_CHAT;
  payload: number;
};
export type addChat = {
  type: Types.ADD_CHAT;
  payload: ChatsPayload;
};

export type sendMessage = {
  type: Types.SEND_MESSAGE;
  payload: {
    obj: object;
    chatId: number;
    author: string;
  };
};
export type ChatsPayload = {
  title: string;
  messages: Array<MessagesPayload>;
  fire: boolean;
  id: number;
};
export type MessagesPayload = {
  id: number;
  chatId: number;
  author: string;
  message: string;
};
export type editChatPayload = {
  newTitle: string;
  chatId: number;
};
export type Actions = sendMessage | addChat | removeChat | fireChat | unfireChat | editChat | setChatsLoading | setChatsError | setMessagesLoading | setMessagesError | setChats;
export const setChatsLoading: ActionCreator<setChatsLoading> = (payload: boolean) => ({
  type: Types.SET_CHATS_LOADING,
  payload,
});
export const setChatsError: ActionCreator<setChatsError> = (payload: boolean) => ({
  type: Types.SET_CHATS_ERROR,
  payload,
});
export const setMessagesLoading: ActionCreator<setMessagesLoading> = (payload: boolean) => ({
  type: Types.SET_MESSAGES_LOADING,
  payload,
});
export const setMessagesError: ActionCreator<setMessagesError> = (payload: boolean) => ({
  type: Types.SET_MESSAGES_ERROR,
  payload,
});
export const setChats : ActionCreator<setChats> = (chats: ChatsPayload) => ({
  type: Types.SET_CHATS,
  payload: chats,
});
export const addChat = (chat: ChatsPayload) => ({
  type: Types.ADD_CHAT,
  payload: chat,
});
export const removeChat: ActionCreator<removeChat> = (chatId: number) => ({
  type: Types.REMOVE_CHAT,
  payload: chatId,
});
export const editChat: ActionCreator<editChat> = (newTitle: string, chatId: number) => ({
  type: Types.EDIT_CHAT,
  payload: { newTitle, chatId },
});
export const sendMessage: ActionCreator<sendMessage> = (obj: object, chatId: number, author: string) => ({
  type: Types.SEND_MESSAGE,
  payload: { obj, chatId, author },
});
export const fireChat: ActionCreator<fireChat> = (chatId: number) => ({
  type: Types.FIRE_CHAT,
  chatId: chatId,
});
export const unfireChat: ActionCreator<unfireChat> = (chatId: number) => ({
  type: Types.UNFIRE_CHAT,
  payload: chatId,
});
export const fetchChats = () => (dispatch: Dispatch) => {
  dispatch(setChatsLoading(true));
  dispatch(setChatsError(false));
  dispatch(setMessagesLoading(true));
  dispatch(setMessagesError(false));
  axios
    .get<ChatsPayload>("http://localhost:3001/chats?_embed=messages")
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

export const addChatAction = (chat: ChatsPayload) => (dispatch: Dispatch) => {
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
    .post<MessagesPayload>("http://localhost:3001/messages", {
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

