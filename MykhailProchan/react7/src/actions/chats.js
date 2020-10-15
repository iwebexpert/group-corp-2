export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const ADD_CHAT = 'ADD_CHAT'
export const CHATS_FIRE = 'CHATS_FIRE'
export const CHATS_UNFIRE = 'CHATS_UNFIRE'

export const CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST'
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS'
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE'

/*export const chatsLoadAction = () => ({
  type: CHATS_LOAD,
})*/

export const chatsLoadRequestAction = () => ({
  type: CHATS_LOAD_REQUEST,
})

export const chatsLoadSuccessAction = (data) => ({
  type: CHATS_LOAD_SUCCESS,
  payload: data,
})

export const chatsLoadFailureAction = (error) => ({
  type: CHATS_LOAD_FAILURE,
  payload: error,
})

export const chatsMessageSendAction = (message) => ({
  type: CHATS_MESSAGE_SEND,
  payload: message,
})

export const addChatAction = (chat) => ({
  type: ADD_CHAT,
  payload: chat
})

export const chatFireAction = (chatId) => ({
  type: CHATS_FIRE,
  payload: chatId
})

export const chatUnfireAction = (chatId) => ({
  type: CHATS_UNFIRE,
  payload: chatId
})

export const chatsLoadAction = () => {
  return async (dispatch) => {
    try {
      dispatch(chatsLoadRequestAction());
      const result = await fetch('http://localhost:3000/chats');
      dispatch(chatsLoadSuccessAction(await result.json()));
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    }
  }
}