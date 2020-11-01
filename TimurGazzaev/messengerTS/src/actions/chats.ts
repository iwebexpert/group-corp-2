import {ActionCreator, Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {AppState} from '../reducers'
import {MessageType} from "../components/MessagesBlock/Message"

export type chatsLoadRequestAction = {
    type: String
}

export type chatsLoadSuccessAction = {
    type: String
    payload: any;
}

export type chatsLoadFailureAction = {
    type: string
    payload: any;
    error: boolean;
}

export type sendMessageLoadSuccessAction = {
    type: string
    payload: any;
    error: boolean;
}

export type chatsAddAction = {
    type: string
    payload: ChatPayload;
}

export type chatsMessageSendAction = {
    type: string
    payload: MessagePayload;
}

export type setOnFire = {
    type: string
    payload: {chatId: string, onFire: boolean};
}

export type deleteChat = {
    type: string
    payload: string;
}

export type addChat = {
    type: string
    payload: ChatPayload;
}

export type deleteMessage = {
    type: string
    payload: {chatId: string, messageId: string};
}

export type toggleIsFetching = {
    type: string
}

export type sendMessage = {
    type: string,
    payload: MessagePayload,
}

type MessagePayload = MessageType & {
    chatId: number;
}

type ChatPayload = {
    chatId: string;
    title: string;
}

export type ChatsActions = chatsLoadRequestAction
    | chatsLoadSuccessAction
    | chatsLoadFailureAction
    | chatsAddAction
    | chatsMessageSendAction
    | setOnFire
    | toggleIsFetching
    | deleteChat
    | addChat
    | deleteMessage
    | sendMessage

export const deleteMessage: ActionCreator<deleteMessage> = (chatId: string, messageId: string) => ({
    type: 'DELETE_MESSAGE',
    payload: {chatId, messageId}
})

export const addChat: ActionCreator<addChat> = (chatId: string, title: string) => ({
    type: 'ADD_CHAT',
    payload: {chatId, title},
})

export const deleteChat: ActionCreator<deleteChat> = (chatId: string) => ({
    type: 'DELETE_CHAT',
    payload: chatId
})

export const toggleIsFetching: ActionCreator<toggleIsFetching> = () => ({
    type: 'TOGGLE_IS_FETCHING',
})

export const setOnFire: ActionCreator<setOnFire> = (chatId: string, onFire: boolean) => ({
    type: 'SET_ON_FIRE',
    payload: {chatId, onFire}
})

export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestAction> = () => ({
    type: 'CHATS_LOAD_REQUEST',
})

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessAction> = (data) => ({
    type: 'CHATS_LOAD_SUCCESS',
    payload: data,
})

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureAction> = (error: any) => ({
    type: 'CHATS_LOAD_FAILURE',
    payload: error,
    error: true,
})

export const chatsLoadAction = (): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(chatsLoadRequestAction())
            const result = await fetch('http://localhost:4000/chats?_embed=messages')
            dispatch(chatsLoadSuccessAction(await result.json()))
        } catch (error) {
            dispatch(chatsLoadFailureAction(error))
        }
    }
}

export const sendMessage: ActionCreator<sendMessage> = (message: MessagePayload) => ({
    type: 'SEND_MESSAGE',
    payload: message,
})
