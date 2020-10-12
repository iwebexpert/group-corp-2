import {ADD_NEW_CHAT, ADD_NEW_MESSAGE_TO_CHAT, CHAT_FIRE, CHAT_LOAD, CHAT_UNFIRE} from '../actions/actionTypes'
import {chatsData} from '../../helpers/chatsData'
import update from 'react-addons-update'
import {nanoid} from 'nanoid'

const initialState = {
	chatsList: [],
	setChatId: 3,
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
				chatsList: [...state.chatsList, action.chat],
				setChatId: state.setChatId + 1,
			}

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

		case ADD_NEW_MESSAGE_TO_CHAT:
			return update(state, {
				chatsList: {
					[action.chatId]: {
						messages: {$push: [{id: nanoid(), text: action.message.text, author: action.message.author}]},
					}
				}
			})

		default:
			return state
	}
}