import axios from '../../axios'
import {ChatsActionTypes} from './actionTypes'
import {ActionCreator, Dispatch} from 'redux'
import {nanoid} from 'nanoid'
import {RequestError} from 'redux-api-middleware'

//types
export type addNewChatRequest = {
	type: ChatsActionTypes.ADD_CHAT_REQUEST
}

export type addNewChatSuccess = {
	type: ChatsActionTypes.ADD_CHAT_SUCCESS,
	newChat: chatType
}

export type addNewChatError = {
	type: ChatsActionTypes.ADD_CHAT_ERROR,
	error: boolean
	payload: RequestError
}

export type deleteChatRequest = {
	type: ChatsActionTypes.DELETE_CHAT_REQUEST,
}

export type deleteChatSuccess = {
	type: ChatsActionTypes.DELETE_CHAT_SUCCESS,
	chatId: number
}

export type deleteChatError =  {
	type: ChatsActionTypes.DELETE_CHAT_ERROR,
	error: boolean
	payload: RequestError
}

export type addNewMessageRequest = {
	type: ChatsActionTypes.ADD_NEW_MESSAGE_REQUEST,
}

export type addNewMessageSuccess = {
	type: ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS,
	message: messageTypeSuccess
}

export type addNewMessageError = {
	type: ChatsActionTypes.ADD_NEW_MESSAGE_ERROR,
	error: boolean
	payload: RequestError
}

export type chatsLoadRequest = {
	type: ChatsActionTypes.CHATS_LOAD_REQUEST,
}

export type chatsLoadSuccess = {
	type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
	chats: chatType[]
}

export type chatsLoadError = {
	type: ChatsActionTypes.CHATS_LOAD_ERROR,
	error: boolean
	payload: RequestError
}

export type setChatFire = {
	type: ChatsActionTypes.CHAT_FIRE,
	chatId: number
}

export type setChatUnfire = {
	type: ChatsActionTypes.CHAT_UNFIRE,
	chatId: number
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
export function addNewChat(chat: chatType) {
	return async (dispatch: Dispatch) => {
		try	{
			dispatch(addNewChatRequest())
			const response = await axios.post(`/chats`, chat)
			dispatch(addNewChatSuccess(await response.data))
		} catch (error) {
			dispatch(addNewChatError(error))
		}
	}
}


export const addNewChatRequest: ActionCreator<addNewChatRequest> = () => ({
	type: ChatsActionTypes.ADD_CHAT_REQUEST,
})

export const addNewChatSuccess: ActionCreator<addNewChatSuccess> = (newChat: chatType) => ({
	type: ChatsActionTypes.ADD_CHAT_SUCCESS,
	newChat
})

export const addNewChatError: ActionCreator<addNewChatError> = (error: RequestError) => ({
	type: ChatsActionTypes.ADD_CHAT_ERROR,
	error: true,
	payload: error
})

export const deleteChat = (chatId: number) => {
	return async (dispatch: Dispatch) => {
		try	{
			dispatch(deleteChatRequest())
			await axios.delete(`/chats/${chatId}`)
			dispatch(deleteChatSuccess(chatId))
		} catch (error) {
			dispatch(deleteChatError(error))
		}
	}
}
export const deleteChatRequest: ActionCreator<deleteChatRequest> = () => ({
	type: ChatsActionTypes.DELETE_CHAT_REQUEST,
})

export const deleteChatSuccess: ActionCreator<deleteChatSuccess> = (chatId: number) => ({
	type: ChatsActionTypes.DELETE_CHAT_SUCCESS,
	chatId
})

export const deleteChatError: ActionCreator<deleteChatError> = (error: RequestError) => ({
	type: ChatsActionTypes.DELETE_CHAT_ERROR,
	error: true,
	payload: error
})

//addNewMessage
export const addNewMessage = (newMessage: messageTypeRequest, chatId: string | number) => {
	return async (dispatch: Dispatch)  => {
		try	{
			dispatch(addNewMessageRequest())
			const message: messageTypeSuccess = {
				...newMessage,
				id: nanoid(),
				chatId: +chatId
			}
			await axios.post(`/messages`, message)
			dispatch(addNewMessageSuccess(message))
		} catch (error) {
			dispatch(addNewMessageError(error))
		}
	}
}

export const addNewMessageRequest: ActionCreator<addNewMessageRequest> = () => ({
	type: ChatsActionTypes.ADD_NEW_MESSAGE_REQUEST,
})

export const addNewMessageSuccess: ActionCreator<addNewMessageSuccess> = (message: messageTypeSuccess) => ({
	type: ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS,
	message
})

export const addNewMessageError: ActionCreator<addNewMessageError>= (error: RequestError) => ({
	type: ChatsActionTypes.ADD_NEW_MESSAGE_ERROR,
	error: true,
	payload: error
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

export const chatsLoadSuccess: ActionCreator<chatsLoadSuccess> = (chats: chatType[]) => ({
	type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
	chats
})

export const chatsLoadError: ActionCreator<chatsLoadError> = (error: RequestError) => ({
	type: ChatsActionTypes.CHATS_LOAD_ERROR,
	error: true,
	payload: error
})
//ChatFire/Unfire
export const setChatFire: ActionCreator<setChatFire> = (chatId: number) => ({
	type: ChatsActionTypes.CHAT_FIRE,
	chatId
})

export const setChatUnfire: ActionCreator<setChatUnfire> = (chatId: number) => ({
	type: ChatsActionTypes.CHAT_UNFIRE,
	chatId
})