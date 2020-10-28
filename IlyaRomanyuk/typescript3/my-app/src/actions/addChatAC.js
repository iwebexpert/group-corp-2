//DAL
import { chatsAPI } from './../dal/api.js';
import { push } from 'connected-react-router';

//Constant
export const ADD_NEW_CHAT = 'ADD-NEW-CHAT';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
export const IS_FETCHING = 'IS-FETCHING';
export const CHAT_FIRE = 'CHAT-FIRE';
export const CHAT_UNFIRE = 'CHAT-UNFIRE';
export const DELETE_CHAT = 'DELETE-CHAT';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';

//AC
export const addChatAC = (chat) => ({ type: ADD_NEW_CHAT, chat });
export const addMessageAC = (message) => ({ type: ADD_NEW_MESSAGE, payload: message });
export const isFetchingAC = (bool) => ({ type: IS_FETCHING, bool });
export const fireChatAC = (chatId) => ({ type: CHAT_FIRE, chatId });
export const unfireChatAC = (chatId) => ({ type: CHAT_UNFIRE, chatId });
export const deleteChatAC = (chatId) => ({ type: DELETE_CHAT, chatId });
export const deleteMessageAC = (chatId, messageId) => ({ type: DELETE_MESSAGE, chatId, messageId });
export const chatsLoadRequestAction = () => ({ type: CHATS_LOAD_REQUEST });
export const chatsLoadSuccessAction = (data) => ({ type: CHATS_LOAD_SUCCESS, payload: data, });
export const chatsLoadFailureAction = (error) => ({ type: CHATS_LOAD_FAILURE, payload: error, });

//TC
export const chatsLoadTC = () => async (dispatch) => {
    try {
        dispatch(chatsLoadRequestAction());
        const result = await chatsAPI.getChats()
        dispatch(chatsLoadSuccessAction(result.data));
    } catch (error) {
        dispatch(chatsLoadFailureAction(error));
    }
};

export const addChatTC = (title) => async (dispatch) => {
    const response = await chatsAPI.addChat(title, 'img/mans/bot.png', false, [])
    if (response.data) {
        dispatch(addChatAC(response.data));
        dispatch(push(`/chats/${response.data.id}`));
    }
}

export const deleteChatTC = (chatId) => async (dispatch) => {
    const response = await chatsAPI.deleteChat(chatId)
    if (response.data) {
        dispatch(deleteChatAC(chatId));
        dispatch(push('/'))
    }
}

export const addMessageTC = (chatId, message) => async (dispatch) => {
    const response = await chatsAPI.addMessage(chatId, message);
    if (response.data) {
        dispatch(addMessageAC({ ...response.data, chatId }));
    }
}

export const deleteMessageTC = (chatId, messageId) => async (dispatch) => {
    const response = await chatsAPI.deleteMessage(messageId);
    if (response.data) {
        dispatch(deleteMessageAC(chatId, messageId));
    }
    return response
}