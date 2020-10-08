import {ADD_NEW_CHAT, ADD_NEW_MESSAGE_TO_CHAT, CHAT_LOAD} from '../actions/actionTypes'
import {chatsData} from '../../helpers/chatsData'

const initialState = {
	chatsList: [],
	lastAuthor: '',
}

export const chatsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHAT_LOAD:
			return {
				...state,
				chatsList: chatsData,
			}

		case ADD_NEW_CHAT:
			return {
				...state,
				chatsList: [...state.chatsList, action.chat]
			}

		case ADD_NEW_MESSAGE_TO_CHAT:
			// return {
			// 	...state,
			// 	chatsList: action.chats,
			// 	lastAuthor: action.lastAuthor
			// }
			return Object.assign({}, state, {
				lastAuthor: action.lastAuthor,
				chatsList: action.chats
			})


		default:
			return state
	}
}