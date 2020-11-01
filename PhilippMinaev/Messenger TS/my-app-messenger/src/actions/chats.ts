import { ActionCreator } from "redux";
import { createAction, RequestError } from "redux-api-middleware";
import { MessageType } from "../components/Message/Message";

export enum ChatsActionTypes {
  CHAT_LOAD_REQUEST = "CHAT_LOAD_REQUEST",
  CHAT_LOAD_SUCCESS = "CHAT_LOAD_SUCCESS",
  CHAT_LOAD_FAILURE = "CHAT_LOAD_FAILURE",

  CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND",
  CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST",
  CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS",
  CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE",

  CHATSLISTS_SEND = "CHATSLISTS_SEND",

  MESSAGE_UNFIRE = "MESSAGE_UNFIRE",
  MESSAGE_FIRE = "MESSAGE_FIRE",
}

export type ChatPayload = {
  title: string;
  avatar: string;
  id: number;
};

type MessageFireUnfire = {
  chatId: number;
};

export type MessagePayload = MessageType & {
  chatId: number;
  id: number;
};

type chatsLoadRequestAction = {
  type: ChatsActionTypes.CHAT_LOAD_REQUEST;
};

type chatsLoadSuccessAction = {
  type: ChatsActionTypes.CHAT_LOAD_SUCCESS;
  payload: any;
};

type chatsLoadFailureAction = {
  type: ChatsActionTypes.CHAT_LOAD_FAILURE;
  payload: RequestError;
  error: boolean;
};

type chatsMessageSendAction = {
  type: ChatsActionTypes.CHATS_MESSAGE_SEND;
  payload: MessagePayload;
};

type chatsListSendAction = {
  type: ChatsActionTypes.CHATSLISTS_SEND;
  payload: ChatPayload;
};

type messageFireAction = {
  type: ChatsActionTypes.MESSAGE_FIRE;
  payload: MessageFireUnfire;
};

type messageUnfireAction = {
  type: ChatsActionTypes.MESSAGE_UNFIRE;
  payload: MessageFireUnfire;
};

//Actions
export type ChatsActions =
  | chatsLoadRequestAction
  | chatsLoadSuccessAction
  | chatsLoadFailureAction
  | chatsMessageSendAction
  | chatsListSendAction
  | messageFireAction
  | messageUnfireAction;

//MiddleWare
export const chatsLoadAction = () =>
  createAction({
    endpoint: "http://localhost:4000/chats?_embed=messages",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      ChatsActionTypes.CHAT_LOAD_REQUEST,
      ChatsActionTypes.CHAT_LOAD_SUCCESS,
      ChatsActionTypes.CHAT_LOAD_FAILURE,
    ],
  });

export const chatsMessageSendAction: ActionCreator<chatsMessageSendAction> = (
  message: MessagePayload
) => ({
  type: ChatsActionTypes.CHATS_MESSAGE_SEND,
  payload: message,
});

export const chatsListSendAction: ActionCreator<chatsListSendAction> = (
  chat: ChatPayload
) => ({
  type: ChatsActionTypes.CHATSLISTS_SEND,
  payload: chat,
});

export const messageSendAction = (message: MessageType) =>
  createAction({
    endpoint: "http://localhost:4000/messages",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...message }),
    types: [
      {
        type: ChatsActionTypes.CHATS_MESSAGE_SEND_REQUEST,
        payload: { ...message },
      },
      {
        type: ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS,
        payload: async (res: Response) => await res.json(),
      },
      ChatsActionTypes.CHATS_MESSAGE_SEND_FAILURE,
    ],
  });

export const messageFireAction: ActionCreator<messageFireAction> = (
  chatId: MessageFireUnfire
) => ({
  type: ChatsActionTypes.MESSAGE_FIRE,
  payload: chatId,
});

export const messageUnfireAction: ActionCreator<messageUnfireAction> = (
  chatId: MessageFireUnfire
) => ({
  type: ChatsActionTypes.MESSAGE_UNFIRE,
  payload: chatId,
});
