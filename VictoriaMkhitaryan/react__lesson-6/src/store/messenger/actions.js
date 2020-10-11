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

export function changeUnreadMessage(chatId, command) {
  return (dispatch, getState) => {
    let unreadMessage = getState().chats.unreadMessage;

    if (command == 'add' && !unreadMessage.includes(chatId)) {
      unreadMessage.push(chatId);
    }
    else {
      unreadMessage = unreadMessage.filter(item => item !== chatId);
    }
    
    // console.log(unreadMessage);
    dispatch({type: types.CHANGE_UNREAD_MESSAGE, unreadMessage});
  }
}