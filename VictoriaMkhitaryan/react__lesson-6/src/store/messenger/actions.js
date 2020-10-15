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

export function deleteChat(chatId) {
  return (dispatch, getState) => {
    const chats = getState().chats.entries;
    console.log(chats);

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

    console.log(chats, findMessage);

    const index = chats.findIndex(item => item.id == chatId);

    dispatch({type: types.DELETE_MESSAGE, index, chatId});
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