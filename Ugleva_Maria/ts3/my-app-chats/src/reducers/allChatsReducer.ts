import update from 'react-addons-update';
import {Reducer} from 'redux';


import {ChatsActions, ChatsActionTypes, DataChatStructure} from '../actions/chatsAction';

export type ChatsReducerState = {
    entries: any;
    loading: boolean;
    error: boolean;
};

const initialState: ChatsReducerState = {
	entries: {},
	loading: false,
	error: false,
};

const allChatsReducer : Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action) => {
	switch (action.type) {
		case ChatsActionTypes.ADD_MESSAGE_TO_CHAT:
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
		case ChatsActionTypes.CHATS_LOAD_REQUEST:
			return {
				...state,
				loading: true,
				error: false,
			};

		case ChatsActionTypes.CHATS_LOAD_SUCCESS:
			const newObj: any = {};
			
			action.payload.forEach((element: DataChatStructure) => {
				newObj[element.id] = element;
			});
			return {
				...state,
				loading: false,
				entries: newObj,
			};

		case ChatsActionTypes.CHATS_LOAD_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
			};
		case ChatsActionTypes.ADD_NEW_CHAT:
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
		case ChatsActionTypes.HIGHLIGHT_CHAT:
			return update(state, {
				entries: {
					[action.chatId]: {
						highlight: { $set: action.highlight },
					},
				},
			});
		case ChatsActionTypes.DELETE_CHAT:
			const newState = {...state};
			delete newState.entries[action.chatId]
			return {
				...newState
			}
		default:
			return state;
	}
};

export default allChatsReducer;
