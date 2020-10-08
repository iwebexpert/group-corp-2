import * as types from './actionTypes';

export function chatsLoad() {
  return dispatch => { dispatch({type: types.CHATS_LOAD}) };
}

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