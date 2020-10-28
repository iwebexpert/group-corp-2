import { createAction } from "redux-api-middleware";

export const CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST";
export const CHATS_LOAD_SUCCESS = "CHATS_LOAD_SUCCESS";
export const CHATS_LOAD_FAILURE = "CHATS_LOAD_FAILURE";

export const CHATS_ADD_SUCCESS = "CHATS_ADD_SUCCESS";
export const CHATS_ADD_REQUEST = "CHATS_ADD_REQUEST";
export const CHATS_ADD_FAILURE = "CHATS_ADD_FAILURE";

export const MESSAGES_SEND_SUCCESS = "MESSAGES_SEND_SUCCESS";
export const MESSAGES_SEND_FAILURE = "MESSAGES_SEND_FAILURE";

export const FIRE_CHAT_SUCCESS = "FIRE_CHAT_SUCCESS";
export const UNFIRE_CHAT_SUCCESS = "UNFIRE_CHAT_SUCCESS";

//CHATS_LOAD

export const chatsLoadRequestAction = () => ({
  type: CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction = (data) => ({
  type: CHATS_LOAD_SUCCESS,
  payload: data,
});

export const chatsLoadFailureAction = (error) => ({
  type: CHATS_LOAD_FAILURE,
  payload: error,
});

export const chatsLoadAction = () => {
  return async (dispatch) => {
    try {
      dispatch(chatsLoadRequestAction());
      const chats = await fetch(
        "http://localhost:4000/chats?_embed=contacts&_embed=messages"
      );
      dispatch(chatsLoadSuccessAction(await chats.json()));
    } catch (error) {
      dispatch(chatsLoadFailureAction(error));
    }
  };
};

//CHATS_ADD

export const chatsAddRequestAction = () => ({
  type: CHATS_ADD_REQUEST,
});

export const chatsAddAction = (chatId, title) =>
  createAction({
    endpoint: "http://localhost:4000/chats",
    method: "POST",
    body: JSON.stringify({
      id: chatId,
      title,
    }),
    headers: { "Content-Type": "application/json" },
    types: [CHATS_ADD_REQUEST, CHATS_ADD_SUCCESS, CHATS_ADD_FAILURE],
  });

export const chatsAddFailureAction = (error) => ({
  type: CHATS_ADD_FAILURE,
  payload: error,
});

// MESSAGES

export const messagesSendSuccess = (message) => ({
  type: MESSAGES_SEND_SUCCESS,
  payload: message,
});

export const messagesSendFailure = (error) => ({
  type: MESSAGES_SEND_FAILURE,
  payload: error,
});

export const messagesSendAction = (message) => {
  return async (dispatch) => {
    try {
      const newMessage = await fetch("http://localhost:4000/messages", {
        method: "POST",
        body: JSON.stringify({
          text: message.text,
          author: message.author,
          chatId: +message.chatId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      dispatch(messagesSendSuccess(await newMessage.json()));
    } catch (error) {
      dispatch(messagesSendFailure(error));
    }
  };
};

//FIRE

export const fireChatAction = (chatId, fire) => ({
  type: FIRE_CHAT_SUCCESS,
  payload: { chatId, fire },
});

export const unfireChatAction = (chatId, fire) => ({
  type: UNFIRE_CHAT_SUCCESS,
  payload: { chatId, fire },
});
