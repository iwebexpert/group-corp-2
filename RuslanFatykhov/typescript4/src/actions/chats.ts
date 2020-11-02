import { RequestError } from "redux-api-middleware";
import { ActionCreator, Dispatch } from "redux";

//ТИПЫ

export enum ChatsActionTypes {
  CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST",
  CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS",
  CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE",

  MESSAGES_SEND_SUCCESS = "MESSAGES_SEND_SUCCESS",
  MESSAGES_SEND_FAILURE = "MESSAGES_SEND_FAILURE",

  CHATS_ADD_SUCCESS = "CHATS_ADD_SUCCESS",
  CHATS_ADD_REQUEST = "CHATS_ADD_REQUEST",
  CHATS_ADD_FAILURE = "CHATS_ADD_FAILURE",

  FIRE_CHAT_SUCCESS = "FIRE_CHAT_SUCCESS",
  UNFIRE_CHAT_SUCCESS = "UNFIRE_CHAT_SUCCESS",
};

export type chatsLoadRequest = {
  type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};

export type chatsLoadSuccess = {
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
  payload: ChatPayload;
};

export type chatsLoadFailure = {
  type: ChatsActionTypes.CHATS_LOAD_FAILURE;
  payload: RequestError;
  error: boolean;
};

type MessagePayload = MessageType & {
  chatId: number;
};

export type messagesSendSuccess = {
  type: ChatsActionTypes.MESSAGES_SEND_SUCCESS;
  payload: MessagePayload;
};

export type messagesSendFailure = {
  type: ChatsActionTypes.MESSAGES_SEND_FAILURE;
  payload: RequestError;
  error: boolean;
};

type ChatPayload = {
  chatId: number;
  title: string;
};

export type chatsAddRequest = {
  type: ChatsActionTypes.CHATS_ADD_REQUEST;
};

export type chatsAddSuccess = {
  type: ChatsActionTypes.CHATS_ADD_SUCCESS;
  payload: ChatPayload;
};

export type chatsAddFailure = {
  type: ChatsActionTypes.CHATS_ADD_FAILURE;
  payload: RequestError;
  error: boolean;
};

type FirePayload = {
  chatId: number;
  fire: boolean;
};

export type fireChat = {
  type: ChatsActionTypes.FIRE_CHAT_SUCCESS;
  payload: FirePayload;
};

export type unfireChat = {
  type: ChatsActionTypes.UNFIRE_CHAT_SUCCESS;
  payload: FirePayload;
};

//ВСЕ ВОЗМОЖНЫЕ ДЕЙСТВИЯ

export type ChatsActions =
  | chatsLoadRequest
  | chatsLoadSuccess
  | chatsLoadFailure
  | messagesSendSuccess
  | messagesSendFailure
  | chatsAddRequest
  | chatsAddSuccess
  | chatsAddFailure
  | fireChat
  | unfireChat;

//ЗАГРУЗКА ЧАТОВ

export const chatsLoadRequestAction: ActionCreator<chatsLoadRequest> = () => ({
  type: ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccess> = (
  data
) => ({
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
  payload: data,
});

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailure> = (
  error: RequestError
) => ({
  type: ChatsActionTypes.CHATS_LOAD_FAILURE,
  payload: error,
  error: true,
});

export const chatsLoadAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(chatsLoadRequestAction());
      const result = await fetch(
        "http://localhost:4000/chats?_embed=contacts&_embed=messages"
      );
      dispatch(chatsLoadSuccessAction(await result.json()));
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    };
  };
};

//ОТПРАВКА СООБЩЕНИЙ

export const messagesSendSuccessAction: ActionCreator<messagesSendSuccess> = (
  message: MessagePayload
) => ({
  type: ChatsActionTypes.MESSAGES_SEND_SUCCESS,
  payload: message,
});

export const messagesSendFailureAction: ActionCreator<messagesSendFailure> = (
  error: RequestError
) => ({
  type: ChatsActionTypes.MESSAGES_SEND_FAILURE,
  payload: error,
  error: true,
});

export const messagesSendAction = (message: MessagePayload) => {
  return async (dispatch: Dispatch) => {
    try {
      const newMessage = await fetch("http://localhost:4000/messages", {
        method: "POST",
        body: JSON.stringify({
          text: message.text,
          author: message.author,
          chatId: +message.chatId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      dispatch(messagesSendSuccessAction(await newMessage.json()));
    } catch (error) {
      dispatch(messagesSendFailureAction(error));
    };
  };
};

//ДОБАВЛЕНИЕ ЧАТОВ

export const chatsAddRequestAction: ActionCreator<chatsAddRequest> = () => ({
  type: ChatsActionTypes.CHATS_ADD_REQUEST,
});

export const chatsAddSuccessAction: ActionCreator<chatsAddSuccess> = (
  chat: ChatPayload
) => ({
  type: ChatsActionTypes.CHATS_ADD_SUCCESS,
  payload: chat,
});

export const chatsAddFailureAction: ActionCreator<chatsAddFailure> = (
  error: RequestError
) => ({
  type: ChatsActionTypes.CHATS_ADD_FAILURE,
  payload: error,
  error: true,
});

export const chatsAddAction = (chatId: number, title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(chatsAddRequestAction());
      const newChat = await fetch("http://localhost:4000/chats", {
        method: "POST",
        body: JSON.stringify({
          id: chatId,
          title,
        }),
        headers: { "Content-Type": "application/json" },
      });
      dispatch(chatsAddSuccessAction(await newChat.json()));
    } catch (error) {
      dispatch(chatsAddFailureAction(error));
    };
  };
};

//ИНДИКАТОР НОВОГО СООБЩЕНИЯ

export const fireChatAction = (chatId: number, fire: boolean) => ({
  type: ChatsActionTypes.FIRE_CHAT_SUCCESS,
  payload: { chatId, fire },
});

export const unfireChatAction = (chatId: number, fire: boolean) => ({
  type: ChatsActionTypes.UNFIRE_CHAT_SUCCESS,
  payload: { chatId, fire },
});
