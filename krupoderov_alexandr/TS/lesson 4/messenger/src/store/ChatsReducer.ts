import { v4 as uuidv4 } from 'uuid';
import { ChatsActionType, ChatsActions } from './actions/chats';
import { IChatType } from '../types';
import { Reducer } from 'redux';

export type ChatsInitialState = {
	chats: Array<IChatType>,
	activeChat: number,
	timer: string,
	isFetching: boolean,
	isSending: boolean,
	chatsError: string,
	addError: string,
	deleteError: string,
	messageError: string | boolean
};

let initialState: ChatsInitialState = {
	chats: [],
	activeChat: 0,
	timer: '',
	isFetching: false,
	isSending: false,
	chatsError: '',
	addError: '',
	deleteError: '',
	messageError: ''
};

export const ChatReducer: Reducer<ChatsInitialState, ChatsActions > = (state = initialState, action) => {
	switch (action.type) {
		case ChatsActionType.SET_ACTIVE_CHAT: {
			return {
				...state,
				activeChat: action.id
			}
		}
		case ChatsActionType.ADD_MESSAGE: {
			let chat: IChatType = {id: '', name: '', photoUrl: 'string', isFire: false, messages: []};
			for (let i = 0; i < state.chats.length; i++) {
				if (+action.id === +state.chats[i].id) {
					chat = state.chats[i]
				}
			}
			chat.messages.push({id: uuidv4(), author: action.author, text: action.message});
			let newChats = state.chats.map(c => {
				if (+c.id === +action.id) {
					c = chat;
					return c
				}
				return c;
			})
			return {
				...state,
				chats: newChats
			};
		}
		case ChatsActionType.ADD_MESSAGE_BOT: {
			let chat: IChatType = {id: '', name: '', photoUrl: 'string', isFire: false, messages: []};
			for (let i = 0; i < state.chats.length; i++) {
				if (+action.chatId === +state.chats[i].id) {
					chat = state.chats[i]
				}
			}
			chat.messages.push({id: uuidv4(), author: action.author, text: action.message});
			let newChats = state.chats.map(c => {
				if (+c.id == +action.chatId) {
					c = chat;
					return c
				}
				return c;
			})
			return {
				...state,
				chats: newChats
			};
		}
		case ChatsActionType.FIRE: {
			let chat: IChatType = {id: '', name: '', photoUrl: 'string', isFire: false, messages: []};
			for (let i = 0; i < state.chats.length; i++) {
				if (+state.chats[i].id === +action.id) {
					chat = state.chats[i];
				}
			}
			chat.isFire = true;
			let chats = state.chats.map(c => {
				if (+c.id === +action.id) {
					return chat;
				}
				return c;
			});
			return {
				...state,
				chats: chats
			}
		}
		case ChatsActionType.UNFIRE: {
			let chat: IChatType = {id: '', name: '', photoUrl: 'string', isFire: false, messages: []};
			for (let i = 0; i < state.chats.length; i++) {
				if (+state.chats[i].id === +action.id) {
					chat = state.chats[i];
				}
			}
			chat.isFire = false;
			let chats = state.chats.map(c => {
				if (+c.id === action.id) {
					return chat;
				}
				return c;
			});
			return {
				...state,
				chats: chats
			}
		}
		case ChatsActionType.TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case ChatsActionType.GET_CHATS_SUCCESS: {
			return {
				...state,
				chats: action.chats
			}
		}
		case ChatsActionType.GET_CHATS_FAILURE: {
			return {
				...state,
				chatsError: action.chatsError
			}
		}
		case ChatsActionType.ADD_CHAT_FAILURE: {
			return {
				...state,
				addError: action.addError,
			}
		}
		case ChatsActionType.DELETE_CHAT_FAILURE: {
			return {
				...state,
				deleteError: action.deleteError
			}
		}
		case ChatsActionType.TOGGLE_IS_MESSAGE_SENDING: {
			return {
				...state,
				isSending: action.isSending
			}
		}
		case ChatsActionType.SENDING_MESSAGE_FAILURE: {
			return {
				...state,
				messageError: action.sendingError
			}
		}
		default: {
			return state;
		}
	}
};
