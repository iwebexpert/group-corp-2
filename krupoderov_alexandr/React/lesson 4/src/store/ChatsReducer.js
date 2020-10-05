import { v4 as uuidv4 } from 'uuid';
import user from '../assets/img/user.png';

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_CHAT = 'ADD_CHAT';

let initialState = {
	chats: [
		{id: 1, name: 'Alex', photoUrl: user, messages: []},
		{id: 2, name: 'Sasha', photoUrl: user, messages: []},
		{id: 3, name: 'Igor', photoUrl: user, messages: []},
		{id: 4, name: 'Mary', photoUrl: user, messages: []},
		{id: 5, name: 'BOOOOOOOR', photoUrl: user, messages: []},
	]
}

export const ChatReducer = (state = initialState, action) => {// id, message
	switch (action.type){
		case ADD_MESSAGE: {
			let chat;
			for (let i = 0; i < state.chats.length; i++){
				if (action.id === state.chats[i].id) {
					chat = state.chats[i]
				}
			}
			chat.messages.push({id: uuidv4(), author: action.author, text: action.message, isBot: action.isBot});
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
				chats: [...state.chats, {id: state.chats - 1, name: action.name, photoUrl: user, messages: []}]
			};
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

export const addMessage = (author, id, message, isBot) => {
	return {
		type: ADD_MESSAGE,
		author,
		id,
		message,
		isBot
	};
};
