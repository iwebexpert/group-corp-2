import { v4 as uuidv4 } from 'uuid';
import user from '../assets/img/user.png';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_CHAT = 'ADD_CHAT';
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
export const FIRE = 'FIRE';
export const UNFIRE = 'UNFIRE';
export const DELETE_CHAT = 'DELETE_CHAT';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

let initialState = {
	chats: [
		{id: 1, name: 'Alex', photoUrl: user, messages: [], isFire: false},
		{id: 2, name: 'Sasha', photoUrl: user, messages: [], isFire: false},
		{id: 3, name: 'Igor', photoUrl: user, messages: [], isFire: false},
		{id: 4, name: 'Mary', photoUrl: user, messages: [], isFire: false},
		{id: 5, name: 'BOOOOOOOR', photoUrl: user, messages: [], isFire: false},
	],
	activeChat: '',
	timer: ''
}

export const ChatReducer = (state = initialState, action) => {// id, message
	switch (action.type){
		case SET_ACTIVE_CHAT: {
			return {
				...state,
				activeChat: action.chatId
			}
		}
		case ADD_MESSAGE: {
			let chat;
			for (let i = 0; i < state.chats.length; i++){
				if (action.id === state.chats[i].id) {
					chat = state.chats[i]
				}
			}
			chat.messages.push({id: uuidv4(), author: action.author, text: action.message});
			let newChats = state.chats.map(c => {
				if (c.id === action.id) {
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
		case ADD_CHAT: {//name
			return {
				...state,
				chats: [...state.chats, {id: state.chats[state.chats.length - 1].id + 1, name: action.name, photoUrl: user, messages: [], isFire: false}]
			};
		}
		case FIRE: {
			let chat;
			for (let i = 0; i < state.chats.length; i++){
				if (state.chats[i].id === action.chatId){
					chat = state.chats[i];
				}
			}
			chat.isFire = true;
			let chats = state.chats.map(c => {
				if (c.id === action.chatId){
					return chat;
				}
				return c;
			});
			return {
				...state,
				chats: chats
			}
		}
		case UNFIRE: {
			let chat;
			for (let i = 0; i < state.chats.length; i++){
				if (state.chats[i].id === action.chatId){
					chat = state.chats[i];
				}
			}
			chat.isFire = false;
			let chats = state.chats.map(c => {
				if (c.id === action.chatId){
					return chat;
				}
				return c;
			});
			return {
				...state,
				chats: chats
			}
		}
		case DELETE_CHAT: {
			let chats = [...state.chats].filter(c => c.id !== action.chatId);
			for (let i = 0; i < chats.length; i++){
				chats[i].id = i + 1;
			}
			return {
				...state,
				chats: chats
			}
		}
		case DELETE_MESSAGE: {
			let messages = [...state.chats[state.activeChat - 1].messages].filter(m => m.id !== action.id);
			return {
				...state,
				chats: [...state.chats].map(c => {
					if (c.id === state.activeChat){
						[...c.messages] = messages;
						return c;
					}
					return c;
				})
			}
		}
		default: {
			return state;
		}
	}
};

export const addChat = (name) => {
	return {
		type: ADD_CHAT,
		name
	};
};

export const addMessage = (author, id, message) => {
	return {
		type: ADD_MESSAGE,
		author,
		id,
		message
	};
};

export const deleteMessage = (id) => {
	return {
		type: DELETE_MESSAGE,
		id
	}
}

export const setActiveChat = (chatId) => {
	return {
		type: SET_ACTIVE_CHAT,
		chatId
	};
};

export const fire = (chatId) => {
	return {
		type: FIRE,
		chatId
	};
};

export const unfire = (chatId) => {
	return {
		type: UNFIRE,
		chatId
	};
};

export const deleteChat = (chatId) => {
	return {
		type: DELETE_CHAT,
		chatId
	};
};
