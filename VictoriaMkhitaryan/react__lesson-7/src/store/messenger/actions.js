import * as types from './actionTypes';
import {createAction} from 'redux-api-middleware'

export function messageSend(message) {
  return dispatch => {
    dispatch({type: types.SEND_MESSAGE, payload: message});
  };
}

export function addChat(title) {
  return dispatch => {
    dispatch({type: types.ADD_CHAT, payload: title});
  };
}

export function deleteChat(chatId) {
  return (dispatch, getState) => {
    const chats = getState().chats.entries;

    const index = chats.findIndex(item => item.id == chatId);

    dispatch({type: types.DELETE_CHAT, index});
  }
}

export function deleteMessage(chatId, messageId) {
  return (dispatch, getState) => {
    const chats = getState().chats.entries;

    const findMessage = chats.find(item => item.id == chatId)
          .messages
          .findIndex(item => item.id == messageId);

    dispatch({type: types.DELETE_MESSAGE, findMessage, chatId});
  }
}

export function changeUnreadMessage(chatId, command) {
  return (dispatch, getState) => {
    let unreadMessage = getState().chats.unreadMessage;

    if (command == 'add' && !unreadMessage.includes(chatId)) {
      dispatch({type: types.ADD_UNREAD_MESSAGE, chatId});
    }
    else {
      dispatch({type: types.REMOVE_UNREAD_MESSAGE, chatId});
    }
  }
}

//Fetch
export const chatsLoadRequestAction = () => ({
  type: types.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction = (data) => ({
  type: types.CHATS_LOAD_SUCCESS,
  payload: data,
});

export const chatsLoadFailureAction = (error) => ({
  type: types.CHATS_LOAD_FAILURE,
  payload: error,
});

// переделать на ф-ию
export const chatsLoad = () => {
  return async (dispatch) => {
      try {
          dispatch(chatsLoadRequestAction());
          const result = await fetch('/api/chats?_embed=messages');
          dispatch(chatsLoadSuccessAction(await result.json()));
      } catch (error) {
          dispatch(chatsLoadFailureAction(error));
      }
  }
};