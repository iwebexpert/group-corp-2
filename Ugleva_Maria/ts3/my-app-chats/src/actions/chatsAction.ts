import { createAction, RequestError } from 'redux-api-middleware';
import { ActionCreator, Dispatch } from 'redux';
import { push } from 'connected-react-router';
import {NewChatStructure} from '../type';

export enum ChatsActionTypes {
	ADD_CHATS_TO_STATE = 'ADD_CHATS_TO_STATE',
	ADD_MESSAGE_TO_CHAT = 'ADD_MESSAGE_TO_CHAT',
	ADD_NEW_CHAT = 'ADD_NEW_CHAT',
	HIGHLIGHT_CHAT = 'HIGHLIGHT_CHAT',

	CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
	CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
	CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

	DELETE_CHAT = 'DELETE_CHAT',
}

export type addChatsToState = {
	type: ChatsActionTypes.ADD_CHATS_TO_STATE;
	data: any;
};

export type addNewMessageToChat = {
	type: ChatsActionTypes.ADD_MESSAGE_TO_CHAT;
	payload: MessagePayload;
	id: string;
};

export type addNewChat = {
	type: ChatsActionTypes.ADD_NEW_CHAT;
	data: NewChatStructure;
};
export type highlightChat = {
	type: ChatsActionTypes.HIGHLIGHT_CHAT;
	chatId: string;
	highlight: boolean;
};
export type chatsLoadRequestAction = {
	type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};
export type chatsLoadSuccessAction = {
	type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
	payload: any;
};
export type chatsLoadFailureAction = {
	type: ChatsActionTypes.CHATS_LOAD_FAILURE;
	payload: RequestError;
	error: boolean;
};
export type deleteChat = {
	type: ChatsActionTypes.DELETE_CHAT;
	chatId: string;
};

export type MessagePayload = {
	author: string;
	text: string;
	id: string;
};

export type DataChatStructure = {
	id: string;
	title: string;
	highlight: boolean;
	avatar: string;
	messages: Array<MessagePayload>;
};
export type ChatsActions =
	| addChatsToState
	| addNewMessageToChat
	| addNewChat
	| highlightChat
	| chatsLoadRequestAction
	| chatsLoadSuccessAction
	| chatsLoadFailureAction
	| deleteChat;
export const addNewMessageToChat: ActionCreator<addNewMessageToChat> = (data: MessagePayload, id: string) => ({
	type: ChatsActionTypes.ADD_MESSAGE_TO_CHAT,
	payload: data,
	id: id,
});
export const addNewChat: ActionCreator<addNewChat> = (data: NewChatStructure) => ({
	type: ChatsActionTypes.ADD_NEW_CHAT,
	data: data,
});

export const highlightChat: ActionCreator<highlightChat> = (chatId: string, highlight: boolean) => ({
	type: ChatsActionTypes.HIGHLIGHT_CHAT,
	chatId,
	highlight,
});
export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestAction> = () => ({
	type: ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessAction> = (data: Array<DataChatStructure>) => ({
	type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
	payload: data,
});

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureAction> = (error: RequestError) => ({
	type: ChatsActionTypes.CHATS_LOAD_FAILURE,
	payload: error,
	error: true,
});
export const deleteChat = (chatId: string) => ({
	type: 'DELETE_CHAT',
	chatId,
});
export const chatsLoadAction = () =>
	createAction({
		endpoint: 'http://localhost:4000/chats?_embed=messages',
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		types: ['CHATS_LOAD_REQUEST', 'CHATS_LOAD_SUCCESS', 'CHATS_LOAD_FAILURE'],
	});

export const fetchMesToChat = (data: MessagePayload, id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await fetch('http://localhost:4000/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...data, chatId: id }),
			});
			if (await result.ok) dispatch(addNewMessageToChat(data, id));
		} catch (error) {
			console.log(error);
		}
	};
};
export const fetchNewChat = (data: NewChatStructure) => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await fetch('http://localhost:4000/chats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...data }),
			});
			if (await result.ok) {
				dispatch(addNewChat(data));
				dispatch(push(`/chats/${data.id}`));
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const fetchDeleteChat = (chatId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await fetch(`http://localhost:4000/chats/${chatId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (await result.ok) dispatch(deleteChat(chatId));
		} catch (error) {
			console.log(error);
		}
	};
};
