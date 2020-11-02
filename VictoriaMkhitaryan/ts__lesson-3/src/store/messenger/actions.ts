import * as types from './actionTypes';
import * as typesData from '../../types/types';
import { ActionCreator, Dispatch } from 'redux';
import { RequestError } from 'redux-api-middleware';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

export const deleteChatByIndex: ActionCreator<types.deleteChat> = (index: number) => ({
  type: types.ChatsActionTypes.DELETE_CHAT, 
  index
});

export const deleteChat = (chatId: number) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const chats = getState().chats.entries;

    const index = chats.findIndex((item: typesData.ChatsData) => item.id == chatId);

    dispatch(deleteChatByIndex(index));
  }
};

export const deleteMessageByChatId: ActionCreator<types.deleteMessageByChatId> = (findMessage: typesData.MessageType, chatId: number) => ({
  type: types.ChatsActionTypes.DELETE_MESSAGE, 
  findMessage, 
  chatId
});

export function deleteMessage(chatId: number, messageId: number) {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const chats = getState().chats.entries;

    const findMessage = chats.find((item: typesData.ChatsData) => item.id == chatId)
          .messages
          .findIndex((item: typesData.ChatsData) => item.id == messageId);

    dispatch(deleteMessageByChatId(findMessage, chatId));
  }
}

export const addUnreadMessage: ActionCreator<types.addUnreadMessage> = (chatId: number) => ({
  type: types.ChatsActionTypes.ADD_UNREAD_MESSAGE,
  chatId
});

export const removeUnreadMessage: ActionCreator<types.removeUnreadMessage> = (chatId: number) => ({
  type: types.ChatsActionTypes.REMOVE_UNREAD_MESSAGE,
  chatId
});

export const changeUnreadMessage = (chatId: number, command: string) => {
  return (dispatch: Dispatch) => {
    if (command == 'add') {
      // dispatch({type: types.ChatsActionTypes.ADD_UNREAD_MESSAGE, chatId});
      dispatch(addUnreadMessage(chatId));
    }
    else {
      // dispatch({type: types.ChatsActionTypes.REMOVE_UNREAD_MESSAGE, chatId});
      dispatch(removeUnreadMessage(chatId));
    }
  }
};

//Fetch
export const chatsLoadRequestAction: ActionCreator<types.chatsLoadRequestAction> = () => ({
  type: types.ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction: ActionCreator<types.chatsLoadSuccessAction> = (data) => ({
  type: types.ChatsActionTypes.CHATS_LOAD_SUCCESS,
  payload: data,
});

export const chatsLoadFailureAction: ActionCreator<types.chatsLoadFailureAction> = (error: RequestError) => ({
  type: types.ChatsActionTypes.CHATS_LOAD_FAILURE,
  payload: error,
  error: true,
});

export const chatsLoad = (): ThunkAction<void, AppState, void, types.ChatActions> => {
  return async (dispatch: Dispatch) => {
      try {
          dispatch(chatsLoadRequestAction());
          const result = await fetch('http://localhost:4000/chats?_embed=messages');
          dispatch(chatsLoadSuccessAction(await result.json()));
      } catch (error) {
          dispatch(chatsLoadFailureAction(error));
      }
  }
};

export const sendMessageSuccess: ActionCreator<types.sendMessageSuccess> = (error: RequestError) => ({
  type: types.ChatsActionTypes.SEND_MESSAGE_SUCCESS,
  payload: error,
});

export const sendMessageLocal: ActionCreator<types.sendMessageLocal> = (message: typesData.MessageType) => ({
  type: types.ChatsActionTypes.SEND_MESSAGE,
  payload: message,
});

export const messageSend = (message: typesData.MessageType) => {
  return async (dispatch: Dispatch) => {
      try {
          dispatch(chatsLoadRequestAction());
          const result = await fetch('http://localhost:4000/messages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(message)
          });

          dispatch(sendMessageSuccess(await result.json()));
          // добавление новогоо сообщения в массив (локально)
          dispatch(sendMessageLocal(message));
          // dispatch({type: types.ChatsActionTypes.SEND_MESSAGE, payload: message});
      } catch (error) {
          dispatch(chatsLoadFailureAction(error));
      }
  }
}

export const addChatSuccess: ActionCreator<types.addChatSuccess> = (title: typesData.NewChatType) => ({
  type: types.ChatsActionTypes.ADD_CHAT,
  payload: title,
});

export const addChat = (title: typesData.NewChatType) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const chats = getState().chats;
    const id = chats.entries.length ? chats.entries[chats.entries.length - 1].id + 1 : 0;

    try {
      dispatch(chatsLoadRequestAction());
      const result = await fetch('http://localhost:4000/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          title,
          type: 1,
          onFire: false,
          messages: [],
        })
      });
      dispatch(dispatch(addChatSuccess(title)));
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    }
  }
}