import * as types from './actionTypes';

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

export const sendMessageSuccess = (error) => ({
  type: types.SEND_MESSAGE_SUCCESS,
  payload: error,
})

export const messageSend = (message) => {
  return async (dispatch) => {
      try {
          dispatch(chatsLoadRequestAction());
          const result = await fetch('/api/messages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(message)
          });

          dispatch(sendMessageSuccess(await result.json()));
          // добавление новогоо сообщения в массив (локально)
          dispatch({type: types.SEND_MESSAGE, payload: message});
      } catch (error) {
          dispatch(chatsLoadFailureAction(error));
      }
  }
}



export const addChat = (title) => {
  return async (dispatch, getState) => {
    const chats = getState().chats;
    const id = chats.entries.length ? chats.entries[chats.entries.length - 1].id + 1 : 0;
    try {
      dispatch(chatsLoadRequestAction());
      const result = await fetch('/api/chats', {
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
      dispatch({type: types.ISLOADING, loading: false});
      dispatch({type: types.ADD_CHAT, payload: title});
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    }
  }
}