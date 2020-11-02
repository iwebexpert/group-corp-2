import { RequestError } from "redux-api-middleware";
import { ActionCreator, Dispatch } from "redux";
import { createAction } from "redux-api-middleware";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers";

export enum ChatsActionTypes {
  CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST",
  CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS",
  CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE",

  CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS",
  CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE",

  ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST",
  ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS",
  ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE",

  CHAT_FIRE = "CHAT_FIRE",
  CHAT_UNFIRE = "CHAT_UNFIRE",
}

type chatsLoadRequestAction = {
  type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};

type chatsLoadSuccessAction = {
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
  payload: any;
};

type chatsLoadFailureAction = {
  type: ChatsActionTypes.CHATS_LOAD_FAILURE;
  payload: RequestError;
  error: boolean;
};

type chatsAddRequestAction = {
  type: ChatsActionTypes.ADD_CHAT_REQUEST;
};

type chatsAddSuccessAction = {
  type: ChatsActionTypes.ADD_CHAT_SUCCESS;
  payload: any;
};

type chatsAddFailureAction = {
  type: ChatsActionTypes.ADD_CHAT_FAILURE;
  payload: RequestError;
  error: boolean;
};

type chatsMessageSendSuccessAction = {
  type: ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS;
  payload: MessageActionType;
};

type chatsMessageSendFailureAction = {
  type: ChatsActionTypes.CHATS_MESSAGE_SEND_FAILURE;
  payload: RequestError;
  error: boolean;
};

type chatFireAction = {
  type: ChatsActionTypes.CHAT_FIRE;
  payload: any;
};

type chatUnfireAction = {
  type: ChatsActionTypes.CHAT_UNFIRE;
  payload: any;
};

export type ChatsActions =
  | chatsLoadRequestAction
  | chatsLoadSuccessAction
  | chatsLoadFailureAction
  | chatsAddRequestAction
  | chatsAddSuccessAction
  | chatsAddFailureAction
  | chatsMessageSendSuccessAction
  | chatsMessageSendFailureAction
  | chatFireAction
  | chatUnfireAction;

export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestAction> = () => ({
  type: ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessAction> = (
  data
) => ({
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
  payload: data,
});

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureAction> = (
  error: RequestError
) => ({
  type: ChatsActionTypes.CHATS_LOAD_FAILURE,
  payload: error,
  error: true,
});

export const chatFireAction: ActionCreator<chatFireAction> = (chatId: any) => ({
  type: ChatsActionTypes.CHAT_FIRE,
  payload: chatId,
});

export const chatUnfireAction: ActionCreator<chatUnfireAction> = (
  chatId: any
) => ({
  type: ChatsActionTypes.CHAT_UNFIRE,
  payload: chatId,
});

// export const addChatAction = (chats: NewChatType) =>
//   createAction({
//     endpoint: "http://localhost:4000/chats",
//     method: "POST",
//     body: JSON.stringify(chats),
//     headers: { "Content-Type": "application/json" },
//     types: [
//       ChatsActionTypes.ADD_CHAT_REQUEST,
//       ChatsActionTypes.ADD_CHAT_SUCCESS,
//       ChatsActionTypes.ADD_CHAT_FAILURE,
//     ],
//   });

export const chatsAddRequestAction: ActionCreator<chatsAddRequestAction> = () => ({
  type: ChatsActionTypes.ADD_CHAT_REQUEST,
});

export const chatsAddSuccessAction: ActionCreator<chatsAddSuccessAction> = (
  chat: NewChatType
) => ({
  type: ChatsActionTypes.ADD_CHAT_SUCCESS,
  payload: chat,
});

export const chatsAddFailureAction: ActionCreator<chatsAddFailureAction> = (
  error: RequestError
) => ({
  type: ChatsActionTypes.ADD_CHAT_FAILURE,
  payload: error,
  error: true,
});

export const addChatAction = (chats: NewChatType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(chatsAddRequestAction());
      const newChat = await fetch("http://localhost:4000/chats", {
        method: "POST",
        body: JSON.stringify(chats),
        headers: { "Content-Type": "application/json" },
      });
      dispatch(chatsAddSuccessAction(await newChat.json()));
    } catch (error) {
      dispatch(chatsAddFailureAction(error));
    }
  };
};

export const chatsMessageSendSuccessAction: ActionCreator<chatsMessageSendSuccessAction> = (
  message: MessageActionType
) => ({
  type: ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS,
  payload: message,
});

export const chatsMessageSendFailureAction: ActionCreator<chatsMessageSendFailureAction> = (
  error: RequestError
) => ({
  type: ChatsActionTypes.CHATS_MESSAGE_SEND_FAILURE,
  payload: error,
  error: true,
});

export const chatsMessageSendAction = (message: MessageActionType) => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await fetch("http://localhost:4000/messages", {
        method: "POST",
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" },
      });
      dispatch(chatsMessageSendSuccessAction(await result.json()));
    } catch (error) {
      dispatch(chatsMessageSendFailureAction(error));
    }
  };
};

export const chatsLoadAction = (): ThunkAction<
  void,
  AppState,
  void,
  ChatsActions
> => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(chatsLoadRequestAction());
      const result = await fetch("http://localhost:4000/chats?_embed=messages");
      dispatch(chatsLoadSuccessAction(await result.json()));
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    }
  };
};
