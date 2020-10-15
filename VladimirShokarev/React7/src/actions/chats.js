import {createAction} from 'redux-api-middleware';

export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";

export const CHATS_LOAD_REQUEST = "CHATS_LOAD_REQUEST";
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';

export const CHATS_MESSAGE_SEND_REQUEST = "CHATS_MESSAGE_SEND_REQUEST";
export const CHATS_MESSAGE_SEND_SUCCESS = "CHATS_MESSAGE_SEND_SUCCESS";
export const CHATS_MESSAGE_SEND_FAILURE = "CHATS_MESSAGE_SEND_FAILURE";
export const ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST";
export const ADD_CHAT_SUCCESS = "ADD_CHAT_SUCCESS";
export const ADD_CHAT_FAILURE = "ADD_CHAT_FAILURE";

export const chatsMessageSendAction = (message) => createAction({
    endpoint: 'http://localhost:3000/messages',
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
    types: [
        CHATS_MESSAGE_SEND_REQUEST,
        CHATS_MESSAGE_SEND_SUCCESS,
        CHATS_MESSAGE_SEND_FAILURE,
    ],
});

export const addChatAction = (chats) => createAction({
    endpoint: 'http://localhost:3000/chats',
    method: "POST",
    body: JSON.stringify(chats),
    headers: { "Content-Type": "application/json" },
    types: [
        ADD_CHAT_REQUEST,
        ADD_CHAT_SUCCESS,
        ADD_CHAT_FAILURE,
    ],
});

export const chatFireAction = (id) => ({
    type: CHAT_FIRE,
    payload: id,
});

export const chatUnfireAction = (id) => ({
    type: CHAT_UNFIRE,
    payload: id,
});

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
            const result = await fetch('/api/chats?_embed=messages');
            dispatch(chatsLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};