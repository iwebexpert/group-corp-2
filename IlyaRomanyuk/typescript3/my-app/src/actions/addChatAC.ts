//DAL
import { chatsAPI } from './../dal/api';
import { push } from 'connected-react-router';
import { Dispatch, ActionCreator } from 'redux';
import {
    addChatACTYPE, addMessageACTYPE, isFetchingACTYPE, fireChatACTYPE, unfireChatACTYPE,
    deleteChatACTYPE, deleteMessageACTYPE, chatsLoadRequestActionTYPE, chatsLoadSuccessActionTYPE, chatsLoadFailureActionTYPE
} from './types';

export enum ChatActionTypes {
    ADD_NEW_CHAT = 'ADD-NEW-CHAT',
    ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE',
    IS_FETCHING = 'IS-FETCHING',
    CHAT_FIRE = 'CHAT-FIRE',
    CHAT_UNFIRE = 'CHAT-UNFIRE',
    DELETE_CHAT = 'DELETE-CHAT',
    DELETE_MESSAGE = 'DELETE_MESSAGE',
    CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
    CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
    CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',
}

//All types

export type ChatActions = addChatACTYPE | addMessageACTYPE | isFetchingACTYPE
    | fireChatACTYPE | unfireChatACTYPE | deleteChatACTYPE | deleteMessageACTYPE | chatsLoadRequestActionTYPE
    | chatsLoadSuccessActionTYPE | chatsLoadFailureActionTYPE;

//AC
export const addChatAC: ActionCreator<addChatACTYPE> = (chat: NavbarListChat) => ({ type: ChatActionTypes.ADD_NEW_CHAT, chat });
export const addMessageAC: ActionCreator<addMessageACTYPE> = (message: NavbarItemMessage) => ({ type: ChatActionTypes.ADD_NEW_MESSAGE, payload: message });
export const isFetchingAC: ActionCreator<isFetchingACTYPE> = (bool: boolean) => ({ type: ChatActionTypes.IS_FETCHING, bool });
export const fireChatAC: ActionCreator<fireChatACTYPE> = (chatId: number) => ({ type: ChatActionTypes.CHAT_FIRE, chatId });
export const unfireChatAC: ActionCreator<unfireChatACTYPE> = (chatId: number) => ({ type: ChatActionTypes.CHAT_UNFIRE, chatId });
export const deleteChatAC: ActionCreator<deleteChatACTYPE> = (chatId: number) => ({ type: ChatActionTypes.DELETE_CHAT, chatId });
export const deleteMessageAC: ActionCreator<deleteMessageACTYPE> = (chatId: number, messageId: string) => ({ type: ChatActionTypes.DELETE_MESSAGE, chatId, messageId });
export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestActionTYPE> = () => ({ type: ChatActionTypes.CHATS_LOAD_REQUEST });
export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessActionTYPE> = (data: Array<NavbarListChat>) => ({ type: ChatActionTypes.CHATS_LOAD_SUCCESS, payload: data, });
export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureActionTYPE> = (error: boolean) => ({ type: ChatActionTypes.CHATS_LOAD_FAILURE, payload: error, });

//TC
export const chatsLoadTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(chatsLoadRequestAction());
        const result = await chatsAPI.getChats()
        dispatch(chatsLoadSuccessAction(result.data));
    } catch (error) {
        dispatch(chatsLoadFailureAction(error));
    }
};

export const addChatTC = (title: string) => async (dispatch: Dispatch) => {
    const response = await chatsAPI.addChat(title, 'img/mans/bot.png', false, [])
    if (response.data) {
        dispatch(addChatAC(response.data));
        dispatch(push(`/chats/${response.data.id}`));
    }
}

export const deleteChatTC = (chatId: number) => async (dispatch: Dispatch) => {
    const response = await chatsAPI.deleteChat(chatId)
    if (response.data) {
        dispatch(deleteChatAC(chatId));
        dispatch(push('/'))
    }
}

export const addMessageTC = (chatId: number, message: Message) => async (dispatch: Dispatch) => {
    const response = await chatsAPI.addMessage(chatId, message);
    if (response.data) {
        dispatch(addMessageAC(response.data));
    }
}

export const deleteMessageTC = (chatId: number, messageId: string) => async (dispatch: Dispatch) => {
    const response = await chatsAPI.deleteMessage(messageId);
    if (response.data) {
        dispatch(deleteMessageAC(chatId, messageId));
    }
    return response
}