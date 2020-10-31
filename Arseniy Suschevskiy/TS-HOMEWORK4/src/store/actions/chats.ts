import axios from '../../axios'
import {ChatsActionTypes} from './actionTypes'
import {ActionCreator, Dispatch} from 'redux'
import {nanoid} from 'nanoid'

//types
export type addNewChatRequest = {
	type: ChatsActionTypes.ADD_CHAT_REQUEST
}

export type addNewChatSuccess = {
	type: ChatsActionTypes.ADD_CHAT_SUCCESS,
	data: any
}

export type addNewChatError = {
	type: ChatsActionTypes.ADD_CHAT_ERROR,
	error: any
}

export type deleteChatRequest = {
	type: ChatsActionTypes.DELETE_CHAT_REQUEST,
}

export type deleteChatSuccess = {
	type: ChatsActionTypes.DELETE_CHAT_SUCCESS,
	data: any,
	chatId: any
}

export type deleteChatError =  {
	type: ChatsActionTypes.DELETE_CHAT_ERROR,
	error: any
}

export type addNewMessageRequest = {
	type: ChatsActionTypes.ADD_NEW_MESSAGE_REQUEST,
}

export type addNewMessageSuccess = {
	type: ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS,
	data: any
}

export type addNewMessageError = {
	type: ChatsActionTypes.ADD_NEW_MESSAGE_ERROR,
	error: any
}

export type chatsLoadRequest = {
	type: ChatsActionTypes.CHATS_LOAD_REQUEST,
}

export type chatsLoadSuccess = {
	type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
	data: any
}

export type chatsLoadError = {
	type: ChatsActionTypes.CHATS_LOAD_ERROR,
	error: any
}

export type setChatFire = {
	type: ChatsActionTypes.CHAT_FIRE,
	chatId: any
}

export type setChatUnfire = {
	type: ChatsActionTypes.CHAT_UNFIRE,
	chatId: any
}

//Все возможные действия
export type ChatsActions =
	addNewChatRequest
	| addNewChatSuccess
	| addNewChatError
	| deleteChatRequest
	| deleteChatError
	| deleteChatSuccess
	| addNewMessageRequest
	| addNewMessageSuccess
	| addNewMessageError
	| chatsLoadRequest
	| chatsLoadSuccess
	| chatsLoadError
	| setChatFire
	| setChatUnfire

//actions
export function addNewChat(chat: any) {
	return async (dispatch: Dispatch) => {
		try	{
			// @ts-ignore
			dispatch(addNewChatRequest())
			const response = await axios.post(`/chats`, chat)
			// @ts-ignore
			dispatch(addNewChatSuccess(await response.data))
		} catch (error) {
			// @ts-ignore
			dispatch(addNewChatError(error))
		}
	}
}


export const addNewChatRequest: ActionCreator<addNewChatRequest> = () => ({
	type: ChatsActionTypes.ADD_CHAT_REQUEST,
})

export const addNewChatSuccess: ActionCreator<addNewChatSuccess> = (data: any) => ({
	type: ChatsActionTypes.ADD_CHAT_SUCCESS,
	data
})

export const addNewChatError: ActionCreator<addNewChatError> = (error: any) => ({
	type: ChatsActionTypes.ADD_CHAT_ERROR,
	error
})

export const deleteChat = (chatId: any) => {
	return async (dispatch: Dispatch) => {
		try	{
			dispatch(deleteChatRequest())
			const response = await axios.delete(`/chats/${chatId}`)
			dispatch(deleteChatSuccess(await response.data, chatId))
		} catch (error) {
			dispatch(deleteChatError(error))
		}
	}
}
export const deleteChatRequest: ActionCreator<deleteChatRequest> = () => ({
	type: ChatsActionTypes.DELETE_CHAT_REQUEST,
})

export const deleteChatSuccess: ActionCreator<deleteChatSuccess> = (data: any, chatId: any) => ({
	type: ChatsActionTypes.DELETE_CHAT_SUCCESS,
	data,
	chatId
})

export const deleteChatError: ActionCreator<deleteChatError> = (error: any) => ({
	type: ChatsActionTypes.DELETE_CHAT_ERROR,
	error
})

//addNewMessage
export const addNewMessage = (message: any, chatId: any) => {
	return async (dispatch: Dispatch)  => {
		try	{
			dispatch(addNewMessageRequest())
			message.id = nanoid()
			message.chatId = Number(chatId)
			const response = await axios.post(`/messages`, message)
			dispatch(addNewMessageSuccess(await response.data))
		} catch (error) {
			dispatch(addNewMessageError(error))
		}
	}
}

export const addNewMessageRequest: ActionCreator<addNewMessageRequest> = () => ({
	type: ChatsActionTypes.ADD_NEW_MESSAGE_REQUEST,
})

export const addNewMessageSuccess: ActionCreator<addNewMessageSuccess> = (data: any) => ({
	type: ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS,
	data
})

export const addNewMessageError: ActionCreator<addNewMessageError>= (error: any) => ({
	type: ChatsActionTypes.ADD_NEW_MESSAGE_ERROR,
	error
})

//chatsLoad
export const chatsLoad = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(chatsLoadRequest())
			const response = await axios.get('/chats?_embed=messages')
			dispatch(chatsLoadSuccess(await response.data))
		} catch (error) {
			dispatch(chatsLoadError(error))
		}
	}
}

export const chatsLoadRequest: ActionCreator<chatsLoadRequest> = () => ({
	type: ChatsActionTypes.CHATS_LOAD_REQUEST,
})

export const chatsLoadSuccess: ActionCreator<chatsLoadSuccess> = (data: any) => ({
	type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
	data
})

export const chatsLoadError: ActionCreator<chatsLoadError> = (error: any) => ({
	type: ChatsActionTypes.CHATS_LOAD_ERROR,
	error
})
//ChatFire/Unfire
export const setChatFire: ActionCreator<setChatFire> = (chatId: any) => ({
	type: ChatsActionTypes.CHAT_FIRE,
	chatId
})

export const setChatUnfire: ActionCreator<setChatUnfire> = (chatId: any) => ({
	type: ChatsActionTypes.CHAT_UNFIRE,
	chatId
})