import axios from '../../axios'
import {
	ADD_CHAT_ERROR,
	ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS,
	ADD_NEW_MESSAGE_ERROR, ADD_NEW_MESSAGE_REQUEST, ADD_NEW_MESSAGE_SUCCESS,
	CHAT_FIRE, CHAT_UNFIRE,
	CHATS_LOAD_ERROR, CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS,
	DELETE_CHAT, DELETE_CHAT_ERROR, DELETE_CHAT_REQUEST, DELETE_CHAT_SUCCESS
} from './actionTypes'
import {nanoid} from 'nanoid'

export function addNewChat(chat) {
	return async dispatch => {
		try	{
			dispatch(addNewChatRequest())
			const response = await axios.post(`/chats`, chat)
			dispatch(addNewChatSuccess(await response.data))
		} catch (error) {
			dispatch(addNewChatError(error))
		}
	}
}

export function addNewChatRequest() {
	return {
		type: ADD_CHAT_REQUEST,
	}
}

export function addNewChatSuccess(data) {
	return {
		type: ADD_CHAT_SUCCESS,
		data
	}
}

export function addNewChatError(error) {
	return {
		type: ADD_CHAT_ERROR,
		error
	}
}


//deleteChat
// export function deleteChat(chatId) {
// 	return {
// 		type: DELETE_CHAT,
// 		chatId
// 	}
// }
export function deleteChat(chatId) {
	return async dispatch => {
		try	{
			dispatch(deleteChatRequest())
			const response = await axios.delete(`/chats/${chatId}`)
			dispatch(deleteChatSuccess(await response.data, chatId))
		} catch (error) {
			dispatch(deleteChatError(error))
		}
	}
}
export function deleteChatRequest() {
	return {
		type: DELETE_CHAT_REQUEST,
	}
}

export function deleteChatSuccess(data, chatId) {
	return {
		type: DELETE_CHAT_SUCCESS,
		data,
		chatId
	}
}

export function deleteChatError(error) {
	return {
		type: DELETE_CHAT_ERROR,
		error
	}
}

//addNewMessage
export function addNewMessage(message, chatId) {
	return async dispatch => {
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

export function addNewMessageRequest() {
	return {
		type: ADD_NEW_MESSAGE_REQUEST,
	}
}

export function addNewMessageSuccess(data) {
	return {
		type: ADD_NEW_MESSAGE_SUCCESS,
		data
	}
}

export function addNewMessageError(error) {
	return {
		type: ADD_NEW_MESSAGE_ERROR,
		error
	}
}

//chatsLoad
export function chatsLoad() {
	return async dispatch => {
		try {
			dispatch(chatsLoadRequest())
			const response = await axios.get('/chats?_embed=messages')
			dispatch(chatsLoadSuccess(await response.data))
		} catch (error) {
			dispatch(chatsLoadError(error))
		}
	}
}

export function chatsLoadRequest() {
	return {
		type: CHATS_LOAD_REQUEST,
	}
}

export function chatsLoadSuccess(data) {
	return {
		type: CHATS_LOAD_SUCCESS,
		data
	}
}

export function chatsLoadError(error) {
	return {
		type: CHATS_LOAD_ERROR,
		error
	}
}
//ChatFire/Unfire
export function setChatFire(chatId) {
	return {
		type: CHAT_FIRE,
		chatId
	}
}

export function setChatUnfire(chatId) {
	return {
		type: CHAT_UNFIRE,
		chatId
	}
}