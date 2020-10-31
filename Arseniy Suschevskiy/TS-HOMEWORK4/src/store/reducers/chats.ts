import {ChatsActionTypes} from '../actions/actionTypes'
import update from 'react-addons-update'
import {Reducer} from 'redux'
import {ChatsActions} from '../actions/chats'

export type ChatsReducerState = {
	chatsList: any,
	loading: boolean,
	chatLoading: boolean,
	messageLoading: boolean
};

const initialState = {
	chatsList: [],
	loading: false,
	chatLoading: false,
	messageLoading: false,
}

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action) => {
	switch (action.type) {
		//CHATS_LOAD
		case ChatsActionTypes.CHATS_LOAD_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case ChatsActionTypes.CHATS_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				chatsList: action.data
			}

		case ChatsActionTypes.CHATS_LOAD_ERROR:
			return {
				...state,
				loading: false,
				error: true
			}

		//ADD_NEW_MESSAGE_TO_CHAT
		case ChatsActionTypes.ADD_NEW_MESSAGE_REQUEST:
			return {
				...state,
				error: false
			}

		case ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS:
			return update(state, {
				chatsList: {
					[+action.data.chatId]: {
						messages: {$push: [{id: action.data.id, text: action.data.text, author: action.data.author}]},
					}
				},
			})

		case ChatsActionTypes.ADD_NEW_MESSAGE_ERROR:
			console.log(action.error, 'error')
			return {
				...state,
				error: true
			}

		case ChatsActionTypes.ADD_CHAT_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case ChatsActionTypes.ADD_CHAT_SUCCESS:
			action.data.messages = []
			return {
				...state,
				chatsList: [...state.chatsList, action.data],
				loading: false,
			}

		case ChatsActionTypes.ADD_CHAT_ERROR:
			return {
				...state,
				chatLoading: false,
				error: true
			}

		//DELETE_CHAT
		case ChatsActionTypes.DELETE_CHAT_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case ChatsActionTypes.DELETE_CHAT_SUCCESS:
			const newChatList = state.chatsList.filter( (chat: any) =>{
				if (chat.id !== action.chatId){
					return chat
				}
			})
			return {
				...state,
				loading: false,
				chatsList: newChatList

			}

		case ChatsActionTypes.DELETE_CHAT_ERROR:
			return {
				...state,
				loading: false,
				error: true
			}


		//CHAT_FIRE/UNFIRE
		case ChatsActionTypes.CHAT_FIRE:
			return update(state, {
				chatsList: {
					[action.chatId]: {
						fire: {$set: true}
					}
				}
			})

		case ChatsActionTypes.CHAT_UNFIRE:
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