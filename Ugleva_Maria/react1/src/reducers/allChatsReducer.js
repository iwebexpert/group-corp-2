import update from 'react-addons-update';

const initialState = {
	entries: {},
	loading: false,
	error: false,
};

const allChatsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_MESSAGE_TO_CHAT':
			return {
				...state,
				entries: {
					...state.entries,
					[action.id]: {
						...state.entries[action.id],
						messages: [
							...state.entries[action.id].messages,
							{ id: action.payload.id, text: action.payload.text, author: action.payload.author },
						],
					},
				},
			};
		case 'CHATS_LOAD_REQUEST':
			return {
				...state,
				loading: true,
				error: false,
			};

		case 'CHATS_LOAD_SUCCESS':
			const newObj = {};
			console.log('payload', action.payload)
			action.payload.forEach(element => {
				newObj[element.id] = element
			});
			console.log('new', newObj)
			return {
				...state,
				loading: false,
				entries: newObj
			};

		case 'CHATS_LOAD_FAILURE':
			return {
				...state,
				loading: false,
				error: true,
			};
		case 'ADD_NEW_CHAT':
			const { id, title, highlight } = action.data;
			return update(state, {
				entries: {
					$merge: {
						[id]: {
							id,
							messages: [],
							title,
							highlight,
						},
					},
				},
			});
		case 'HIGHLIGHT_CHAT':
			return update(state, {
				entries: {
					[action.chatId]: {
					highlight:{$set: action.highlight} 
				}						
				
			}})
		default:
			return state;
	}
};


export default allChatsReducer;
