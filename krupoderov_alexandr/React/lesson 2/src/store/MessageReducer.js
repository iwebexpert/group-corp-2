const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
	messages: []
};

export const MessageReducer = (state = initialState, action) => {
	switch (action.type){
		case ADD_MESSAGE: {
			return {
				...state,
				messages: [...state.messages, {author: action.author, message: action.message}]
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
		author,
		message
	};
};

