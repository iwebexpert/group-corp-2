import {ADD_NEW_CHAT, ADD_NEW_MESSAGE_TO_CHAT, CHAT_FIRE, CHAT_LOAD, CHAT_UNFIRE} from './actionTypes'

export function addNewChat(chat) {
	return {
		type: ADD_NEW_CHAT,
		chat
	}
}

export function addNewMessage(message, chatId) {
	return {
		type: ADD_NEW_MESSAGE_TO_CHAT,
		message,
		chatId
	}
}

export function chatsLoad() {
	return {
		type: CHAT_LOAD,
	}
}

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