import {ADD_NEW_CHAT, ADD_NEW_MESSAGE_TO_CHAT, CHAT_LOAD} from './actionTypes'
import {nanoid} from 'nanoid'

export function addNewChat(chat) {
	return {
		type: ADD_NEW_CHAT,
		chat
	}
}

export function addNewMessage(message, chat) {

	return (dispatch, getState) => {
		const chats = getState().chats.chatsList

		message.id = nanoid()
		chat.messages = chats[chat.id].messages.concat([message])
		chats[chat.id] = chat

		dispatch(addNewMessageToChat(chats, message.author))
	}
}

export function addNewMessageToChat(chats, lastAuthor) {
	return {
		type: ADD_NEW_MESSAGE_TO_CHAT,
		chats,
		lastAuthor
	}
}
export function chatsLoad() {
	return {
		type: CHAT_LOAD,
	}
}