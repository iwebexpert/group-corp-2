import * as axios from 'axios';
import { push } from 'connected-react-router';

//Constant
export const ADD_NEW_CHAT = 'ADD-NEW-CHAT';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
export const IS_FETCHING = 'IS-FETCHING';
export const CHAT_FIRE = 'CHAT-FIRE';
export const CHAT_UNFIRE = 'CHAT-UNFIRE';
export const DELETE_CHAT = 'DELETE-CHAT';
export const CLEAN_ALL_MESSAGES = 'CLEAN_ALL_MESSAGES';
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
export const cleanAllMessagesAC = (chatId) => ({ type: CLEAN_ALL_MESSAGES, chatId });
export const deleteMessageAC = (chatId, messageId) => ({ type: DELETE_MESSAGE, chatId, messageId });
export const chatsLoadRequestAction = () => ({ type: CHATS_LOAD_REQUEST });
export const chatsLoadSuccessAction = (data) => ({ type: CHATS_LOAD_SUCCESS, payload: data, });
export const chatsLoadFailureAction = (error) => ({ type: CHATS_LOAD_FAILURE, payload: error, });

//TC
export const chatsLoadTC = () => async (dispatch) => {
    try {
        dispatch(chatsLoadRequestAction());
        const result = await axios.get('http://localhost:3000/chats?_embed=messages')
        dispatch(chatsLoadSuccessAction(result.data));
    } catch (error) {
        dispatch(chatsLoadFailureAction(error));
    }
};

export const addChatTC = (id, title) => async (dispatch) => {
    const response = await axios.post(`http://localhost:3000/chats`, {
        id, title, image: 'src/img/mans/bot.png', fire: false, messages: []
    });

    if (response.data) {
        dispatch(addChatAC(response.data));
        dispatch(push(`/chats/${id}`));
    }
}

export const deleteChatTC = (chatId) => async (dispatch) => {
    console.log(chatId)
    const response = await axios.delete(`http://localhost:3000/chats/${chatId}`);
    if (response.data) {
        dispatch(deleteChatAC(chatId));
        dispatch(push('/'))
    }
    return response
}

export const addMessageTC = (chatId, message) => async (dispatch) => {
    const response = await axios.post(`http://localhost:3000/chats/${chatId}/messages`, { ...message });
    if (response.data) {
        dispatch(addMessageAC({ ...response.data, chatId }));
    }
}

export const deleteMessageTC = (chatId, messageId) => async (dispatch) => {
    const response = await axios.delete(`http://localhost:3000/messages/${messageId}`);
    if (response.data) {
        dispatch(deleteMessageAC(chatId, messageId));
    }
}