import {v4 as uuidv4} from 'uuid';
import user from '../assets/img/user.png';
import {chatsAPI} from '../api/chatsAPI';
import {push} from 'connected-react-router';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGE_BOT = 'ADD_MESSAGE_BOT';
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
export const FIRE = 'FIRE';
export const UNFIRE = 'UNFIRE';
export const DELETE_CHAT_FAILURE = 'DELETE_CHAT_FAILURE';
export const ADD_CHAT_FAILURE = 'ADD_CHAT_FAILURE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
export const GET_CHATS_FAILURE = 'GET_CHATS_FAILURE';
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
export const TOGGLE_IS_MESSAGE_SENDING = 'TOGGLE_IS_MESSAGE_SENDING';
export const SENDING_MESSAGE_FAILURE = 'SENDING_MESSAGE_FAILURE';

let initialState = {
	chats: [],
	activeChat: null,
	timer: '',
	isFetching: false,
	isSending: false,
	chatsError: '',
	addError: '',
	deleteError: '',
	messageError: ''
}

export const ChatReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVE_CHAT: {
			return {
				...state,
				activeChat: action.chatId
			}
		}
		case ADD_MESSAGE: {
			let chat;
			for (let i = 0; i < state.chats.length; i++) {
				if (+action.chatId === +state.chats[i].id) {
					chat = state.chats[i]
				}
			}
			chat.messages.push({id: uuidv4(), author: action.author, text: action.message});
			let newChats = state.chats.map(c => {
				if (c.chatId === +action.chatId) {
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
		case ADD_MESSAGE_BOT: {
			let chat;
			for (let i = 0; i < state.chats.length; i++) {
				if (+action.chatId === +state.chats[i].id) {
					chat = state.chats[i]
				}
			}
			chat.messages.push({id: uuidv4(), author: action.author, text: action.message});
			let newChats = state.chats.map(c => {
				if (c.chatId === +action.chatId) {
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
		case FIRE: {
			let chat;
			for (let i = 0; i < state.chats.length; i++) {
				if (+state.chats[i].id === +action.chatId) {
					chat = state.chats[i];
				}
			}
			chat.isFire = true;
			let chats = state.chats.map(c => {
				if (c.id === +action.chatId) {
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
			for (let i = 0; i < state.chats.length; i++) {
				if (state.chats[i].id === action.chatId) {
					chat = state.chats[i];
				}
			}
			chat.isFire = false;
			let chats = state.chats.map(c => {
				if (c.id === action.chatId) {
					return chat;
				}
				return c;
			});
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
					if (c.id === state.activeChat) {
						[...c.messages] = messages;
						return c;
					}
					return c;
				})
			}
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case GET_CHATS_SUCCESS: {
			return {
				...state,
				chats: action.chats
			}
		}
		case GET_CHATS_FAILURE: {
			return {
				...state,
				chatsError: action.chatsError
			}
		}
		case ADD_CHAT_FAILURE: {
			return {
				...state,
				addError: action.addError,
			}
		}
		case DELETE_CHAT_FAILURE: {
			return {
				...state,
				deleteError: action.deleteError
			}
		}
		case TOGGLE_IS_MESSAGE_SENDING: {
			return {
				...state,
				isSending: action.isSending
			}
		}
		case SENDING_MESSAGE_FAILURE: {
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

export const addMessage = (author, chatId, message) => ({type: ADD_MESSAGE, author, chatId, message});

export const addMessageBot = (author, chatId, message) => ({type: ADD_MESSAGE_BOT, author, chatId, message});

export const setActiveChat = chatId => ({type: SET_ACTIVE_CHAT, chatId});

export const fire = chatId => ({type: FIRE, chatId});

export const unfire = chatId => ({type: UNFIRE, chatId});

const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});

const toggleIsMessageSending = isSending => ({type: TOGGLE_IS_MESSAGE_SENDING, isSending});

const getChatsSuccess = chats => ({type: GET_CHATS_SUCCESS, chats});

const getChatsFailure = chatsError => ({type: GET_CHATS_FAILURE, chatsError});

const deleteChatFailure = deleteError => ({type: DELETE_CHAT_FAILURE, deleteError});

const addChatFailure = addError => ({type: ADD_CHAT_FAILURE, addError});

const sendMessageFailure = sendingError => ({type: SENDING_MESSAGE_FAILURE, sendingError});

export const getChatsThunk = () => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	try {
		dispatch(getChatsFailure(false));
		let chats = await chatsAPI.getChats();
		chats = [...chats].map(c => {
			if (!c.messages.length) {
				c.messages = [];
				return c;
			}
			return c;
		})
		await dispatch(getChatsSuccess(chats));
		await dispatch(toggleIsFetching(false));
	}
	catch (error){
		dispatch(getChatsFailure(true));
		dispatch(toggleIsFetching(false));
	}
};

export const addChatThunk = (name) => async (dispatch, getState) => {
	dispatch(toggleIsFetching(true));
	try {
		let id = getState().chats.chats.length ? (parseInt(getState().chats.chats[getState().chats.chats.length - 1].id) + 1).toString() : "1";
		await chatsAPI.addChat(id.toString(), name, false, user);
		await dispatch(getChatsThunk());
		dispatch(push(`/chat/${id}`));
		dispatch(toggleIsFetching(false));
	}
	catch (error){
		await dispatch(toggleIsFetching(false));
		await dispatch(addChatFailure(error));
	}
};

export const deleteChatThunk = (id) => async (dispatch, getState) => {
	dispatch(toggleIsFetching(true));
	try {
		let newId = +getState().chats.chats[0].id;
		await chatsAPI.deleteChat(id);
		dispatch(push(`/chat/${newId}`));
		await dispatch(getChatsThunk());
		await dispatch(toggleIsFetching(false));
	}
	catch (error){
		dispatch(toggleIsFetching(false));
		dispatch(deleteChatFailure( error));
	}
};

export const addMessageThunk = (chatId, author, text) => async (dispatch) => {
	dispatch(toggleIsMessageSending(true));
	try {
		let response = await chatsAPI.sendMessage(chatId, author, text);
		if (author === 'Bot'){
			await dispatch(toggleIsMessageSending(false));
			await dispatch(addMessageBot(response.data.author, parseInt(chatId), response.data.text));
		}else {
			await dispatch(addMessage(response.data.author, parseInt(response.data.chatId), response.data.text));
			await dispatch(toggleIsMessageSending(false));
		}
	}
	catch (error){
		dispatch(toggleIsFetching(false));
		dispatch(sendMessageFailure(error));
	}
};
