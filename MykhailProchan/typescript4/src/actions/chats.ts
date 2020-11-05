import { ActionCreator, Dispatch } from "redux"

export enum ChatsActionTypes {
  CHATS_LOAD = 'CHATS_LOAD',
  CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND',
  ADD_CHAT = 'ADD_CHAT',
  CHATS_FIRE = 'CHATS_FIRE',
  CHATS_UNFIRE = 'CHATS_UNFIRE',

  CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
  CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
  CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE'
}

type ChatPayload = {
  id: number
  name: string
  messages: MessageType
};

type ChatId = {
  chatId: number
}

type SendMessagePayload = MessageType & { chatId: number }

export type chatsLoadRequestAction = {
  type: ChatsActionTypes.CHATS_LOAD_REQUEST
}

export type chatsLoadSuccessAction = {
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
  payload: ChatType[]
}

export type chatsLoadFailureAction = {
  type: ChatsActionTypes.CHATS_LOAD_FAILURE,
  payload: boolean,
}

export type chatsMessageSendAction = {
  type: ChatsActionTypes.CHATS_MESSAGE_SEND,
  payload: SendMessagePayload
}

export type addChatAction = {
  type: ChatsActionTypes.ADD_CHAT,
  payload: ChatPayload
}

export type chatFireAction = {
  type: ChatsActionTypes.CHATS_FIRE,
  payload: ChatId
}

export type chatUnfireAction = {
  type: ChatsActionTypes.CHATS_UNFIRE,
  payload: ChatId
}

export type ChatsActions = chatsLoadRequestAction
  | chatsLoadSuccessAction
  | chatsLoadFailureAction
  | addChatAction
  | chatsMessageSendAction
  | chatFireAction
  | chatUnfireAction

export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestAction> = () => ({
  type: ChatsActionTypes.CHATS_LOAD_REQUEST,
})

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessAction> = (data) => ({
  type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
  payload: data,
})

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureAction> = (error: boolean) => ({
  type: ChatsActionTypes.CHATS_LOAD_FAILURE,
  payload: error,
})

export const chatsMessageSendAction: ActionCreator<chatsMessageSendAction> = (message) => ({
  type: ChatsActionTypes.CHATS_MESSAGE_SEND,
  payload: message,
})

export const addChatAction: ActionCreator<addChatAction> = (chat) => ({
  type: ChatsActionTypes.ADD_CHAT,
  payload: chat
})

export const chatFireAction: ActionCreator<chatFireAction> = (chatId) => ({
  type: ChatsActionTypes.CHATS_FIRE,
  payload: chatId
})

export const chatUnfireAction: ActionCreator<chatUnfireAction> = (chatId) => ({
  type: ChatsActionTypes.CHATS_UNFIRE,
  payload: chatId
})

export const chatsLoadAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(chatsLoadRequestAction());
      const result = await fetch('http://localhost:4000/chats');
      dispatch(chatsLoadSuccessAction(await result.json()));
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    }
  }
}