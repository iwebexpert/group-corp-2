import { ActionCreator } from 'redux';
import { chatsAPI } from '../../api/chatsAPI';
import user from '../../assets/img/user.png';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';

export enum ChatsActionType {
    ADD_MESSAGE = 'ADD_MESSAGE',
    ADD_MESSAGE_BOT = 'ADD_MESSAGE_BOT',
    SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT',
    FIRE = 'FIRE',
    UNFIRE = 'UNFIRE',
    DELETE_CHAT_FAILURE = 'DELETE_CHAT_FAILURE',
    ADD_CHAT_FAILURE = 'ADD_CHAT_FAILURE',
    GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS',
    GET_CHATS_FAILURE = 'GET_CHATS_FAILURE',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_MESSAGE_SENDING = 'TOGGLE_IS_MESSAGE_SENDING',
    SENDING_MESSAGE_FAILURE = 'SENDING_MESSAGE_FAILURE',
}

export type addMessageAction = {
    type: ChatsActionType.ADD_MESSAGE,
    author: string,
    id: string,
    message: string,
};

export type addMessageBotAction = {
    type: ChatsActionType.ADD_MESSAGE_BOT,
    author: string,
    chatId: string,
    message: string,
};

export type setActiveChatAction = {
    type: ChatsActionType.SET_ACTIVE_CHAT,
    id: number,
};

export type fireAction = {
    type: ChatsActionType.FIRE,
    id: number,
};

export type unfireAction = {
    type: ChatsActionType.UNFIRE,
    id: number,
};

export type toggleIsFetchingAction = {
    type: ChatsActionType.TOGGLE_IS_FETCHING,
    isFetching: boolean,
};

export type toggleIsMessageSendingAction = {
    type: ChatsActionType.TOGGLE_IS_MESSAGE_SENDING,
    isSending: boolean,
};

export type getChatsSuccessAction = {
    type: ChatsActionType.GET_CHATS_SUCCESS,
    chats: Array<any>,
};

export type getChatsFailureAction = {
    type: ChatsActionType.GET_CHATS_FAILURE,
    chatsError: string,
};

export type deleteChatFailure = {
    type: ChatsActionType.DELETE_CHAT_FAILURE,
    deleteError: string,
};

export type sendMessageFailureAction = {
    type: ChatsActionType.SENDING_MESSAGE_FAILURE,
    sendingError: boolean,
};

export type addChatFailureAction = {
    type: ChatsActionType.ADD_CHAT_FAILURE,
    addError: string,
};


export type ChatsActions = addChatFailureAction |
    sendMessageFailureAction |
    deleteChatFailure |
    getChatsFailureAction |
    getChatsSuccessAction |
    toggleIsMessageSendingAction |
    toggleIsFetchingAction |
    unfireAction |
    fireAction |
    setActiveChatAction |
    addMessageBotAction |
    addMessageAction |
    CallHistoryMethodAction<[string, unknown?]>

export const addMessage: ActionCreator<addMessageAction> = (author, id, message) => ({type: ChatsActionType.ADD_MESSAGE, author, id, message});

export const addMessageBot: ActionCreator<addMessageBotAction> = (author, chatId, message) => ({type: ChatsActionType.ADD_MESSAGE_BOT, author, chatId, message});

export const setActiveChat: ActionCreator<setActiveChatAction> = id => ({type: ChatsActionType.SET_ACTIVE_CHAT, id});

export const fire: ActionCreator<fireAction> = id => ({type: ChatsActionType.FIRE, id});

export const unfire: ActionCreator<unfireAction> = id => ({type: ChatsActionType.UNFIRE, id});

const toggleIsFetching: ActionCreator<toggleIsFetchingAction> = isFetching => ({type: ChatsActionType.TOGGLE_IS_FETCHING, isFetching});

const toggleIsMessageSending: ActionCreator<toggleIsMessageSendingAction> = isSending => ({type: ChatsActionType.TOGGLE_IS_MESSAGE_SENDING, isSending});

const getChatsSuccess: ActionCreator<getChatsSuccessAction> = chats => ({type: ChatsActionType.GET_CHATS_SUCCESS, chats});

const getChatsFailure: ActionCreator<getChatsFailureAction> = chatsError => ({type: ChatsActionType.GET_CHATS_FAILURE, chatsError});

const deleteChatFailure: ActionCreator<deleteChatFailure> = deleteError => ({type: ChatsActionType.DELETE_CHAT_FAILURE, deleteError});

const addChatFailure: ActionCreator<addChatFailureAction> = addError => ({type: ChatsActionType.ADD_CHAT_FAILURE, addError});

const sendMessageFailure: ActionCreator<sendMessageFailureAction> = sendingError => ({type: ChatsActionType.SENDING_MESSAGE_FAILURE, sendingError});

export const getChatsThunkCreator = (): ThunkAction<void, AppState, unknown, ChatsActions> => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
        dispatch(getChatsFailure(false));
        let chats = await chatsAPI.getChats();
        chats = [...chats].map(c => {
            if (!c.messages.length) {
                c.messages = [];
                return c;
            }
            return c;
        })
        await dispatch(getChatsSuccess(chats));
        await dispatch(toggleIsFetching(false));
    }
    catch (error){
        dispatch(getChatsFailure(true));
        dispatch(toggleIsFetching(false));
    }
};

export const addChatThunkCreator = (name: string): ThunkAction<Promise<void>, AppState, unknown, ChatsActions> => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    try {
        let id = getState().chats.chats.length ? (parseInt(getState().chats.chats[getState().chats.chats.length - 1].id) + 1).toString() : "1";
        await chatsAPI.addChat(id.toString(), name, false, user);
        await dispatch(getChatsThunkCreator());
        dispatch(push(`/chat/${id}`));
        dispatch(toggleIsFetching(false));
    }
    catch (error){
        await dispatch(toggleIsFetching(false));
        await dispatch(addChatFailure(error));
    }
};

export const deleteChatThunkCreator = (id: number): ThunkAction<void, AppState, unknown, ChatsActions> => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    try {
        let newId = +getState().chats.chats[0].id;
        await chatsAPI.deleteChat(id);
        dispatch(push(`/chat/${newId}`));
        await dispatch(getChatsThunkCreator());
        await dispatch(toggleIsFetching(false));
    }
    catch (error){
        dispatch(toggleIsFetching(false));
        dispatch(deleteChatFailure( error));
    }
};

export const addMessageThunkCreator = (chatId: string, author: string, text: string): ThunkAction<void, AppState, unknown, ChatsActions> => async (dispatch: Dispatch) => {
    dispatch(toggleIsMessageSending(true));
    try {
        let response = await chatsAPI.sendMessage(chatId, author, text);
        if (author === 'Bot'){
            await dispatch(toggleIsMessageSending(false));
            await dispatch(addMessageBot(response.data.author, parseInt(chatId), response.data.text));
        }else {
            await dispatch(addMessage(response.data.author, parseInt(response.data.chatId), response.data.text));
            await dispatch(toggleIsMessageSending(false));
        }
    }
    catch (error){
        dispatch(toggleIsFetching(false));
        dispatch(sendMessageFailure(error));
    }
};