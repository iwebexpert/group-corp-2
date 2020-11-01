import { nanoid } from 'nanoid';
import { fetchMesToChat, highlightChat, ChatsActionTypes } from '../actions/chatsAction';
import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import { ChahgeActionTypes } from '../actions/changeActiveChat';

let interval: NodeJS.Timeout | null = null;
if (interval) clearTimeout(interval);

export const botAnswerMiddware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action) => {
	if (action.type === ChatsActionTypes.ADD_MESSAGE_TO_CHAT) {
		const { payload, id } = action;
		if (payload.author !== 'Bot') {
			interval = setTimeout(() => {
				const chat = store.getState().allChats.entries[id];
				if (chat.messages[chat.messages.length - 1].author === 'Bot') return;
				store.dispatch(
					fetchMesToChat({ id: nanoid(), text: `Hi ${payload.author}! Погуляем?`, author: 'Bot' }, id) as any
				);

				if (store.getState().activeChat !== id) store.dispatch(highlightChat(id, true));
			}, 3000);
		} else {
			if (interval) clearTimeout(interval);
		}
	}
	if (action.type === ChahgeActionTypes.UPDATE_ACTIVE_CHAT) {
		setTimeout(() => store.dispatch(highlightChat(action.id, false)), 0);
	}

	return next(action);
};
