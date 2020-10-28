import { createAction } from 'redux-api-middleware';

export const addChatsToState = (data) => ({
	type: 'ADD_CHATS_TO_STATE',
	data: data,
});
export const addNewMessageToChat = (data, id) => ({
	type: 'ADD_MESSAGE_TO_CHAT',
	payload: data,
	id: id,
});
export const addNewChat = (data) => ({
	type: 'ADD_NEW_CHAT',
	data: data,
});

export const highlightChat = (chatId, highlight) => ({
	type: 'HIGHLIGHT_CHAT',
	chatId,
	highlight,
});
export const chatsLoadRequestAction = () => ({
	type: 'CHATS_LOAD_REQUEST',
});

export const chatsLoadSuccessAction = (data) => ({
	type: 'CHATS_LOAD_SUCCESS',
	payload: data,
});

export const chatsLoadFailureAction = (error) => ({
	type: 'CHATS_LOAD_FAILURE',
	payload: error,
});
export const deleteChat = (chatId) => ({
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

export const fetchMesToChat = (data, id) => {
	return async (dispatch) => {
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
export const fetchNewChat = (data) => {
	return async (dispatch) => {
		try {
			const result = await fetch('http://localhost:4000/chats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...data }),
			});
			if (await result.ok) dispatch(addNewChat(data));
		} catch (error) {
			console.log(error);
		}
	};
};
export const fetchDeleteChat = (chatId) => {
	return async (dispatch) => {
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
