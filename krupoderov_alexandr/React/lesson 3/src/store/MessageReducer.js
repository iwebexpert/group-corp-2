const ADD_MESSAGE = 'ADD_MESSAGE';
import { v4 as uuidv4 } from 'uuid';

let initialState = {
	messages: []
}

export const MessageReducer = (state = initialState, action) => {
	switch (action.type){
		case ADD_MESSAGE: {
			return {
				...state,
				messages: [...state.messages, {id: action.id, author: action.author, message: action.message}]
			};
		}
		default: {
			return state;
		}
	}
};

export const addMessage = (author, message) => {
	return {
		type: ADD_MESSAGE,
		id: uuidv4(),
		author,
		message
	};
};

