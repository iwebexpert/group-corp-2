import {
	ADD_NEW_CHAT,
	ADD_NEW_MESSAGE_ERROR, ADD_NEW_MESSAGE_REQUEST, ADD_NEW_MESSAGE_SUCCESS,
	CHAT_FIRE, CHAT_UNFIRE,
	CHATS_LOAD_ERROR, CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS,
	DELETE_CHAT
} from '../actions/actionTypes'
import update from 'react-addons-update'

const initialState = {
	chatsList: [],
	setChatId: 3,
	loading: false
}

export const chatsReducer = (state = initialState, action) => {
	switch (action.type) {
		//CHATS_LOAD
		case CHATS_LOAD_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case CHATS_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				chatsList: action.data
			}

		case CHATS_LOAD_ERROR:
			return {
				...state,
				loading: false,
				error: true
			}

		//ADD_NEW_MESSAGE_TO_CHAT
		case ADD_NEW_MESSAGE_REQUEST:
			return {
				...state,
				error: false
			}

		case ADD_NEW_MESSAGE_SUCCESS:
			return update(state, {
				chatsList: {
					[+action.data.chatId]: {
						messages: {$push: [{id: action.data.id, text: action.data.text, author: action.data.author}]},
					}
				},
			})

		case ADD_NEW_MESSAGE_ERROR:
			console.log(action.error, 'error')
			return {
				...state,
				error: true
			}
		//ADD_NEW_CHAT
		case ADD_NEW_CHAT:
			return {
				...state,
				chatsList: [...state.chatsList, action.chat],
				setChatId: state.setChatId + 1,
			}

		//DELETE_CHAT
		case DELETE_CHAT:
			const newChatList = state.chatsList.filter( chat =>{
				if (chat.id !== action.chatId){
					return chat
				}
			})
			return {
				...state,
				chatsList: newChatList
			}

		//CHAT_FIRE/UNFIRE
		case CHAT_FIRE:
			return update(state, {
				chatsList: {
					[action.chatId]: {
						fire: {$set: true}
					}
				}
			})

		case CHAT_UNFIRE:
			return update(state, {
				chatsList: {
					[action.chatId]: {
						fire: {$set: false}
					}
				}
			})


		default:
			return state
	}
}