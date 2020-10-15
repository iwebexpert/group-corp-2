import { nanoid } from 'nanoid';
import { fetchMesToChat, highlightChat } from '../actions/chatsAction';
let interval = null;
clearTimeout(interval);

export const botAnswerMiddware = (store) => (next) => (action) => {
	if (action.type === 'ADD_MESSAGE_TO_CHAT') {
		const { payload, id } = action;
		if (payload.author !== 'Bot') {
			interval = setTimeout(() => {
				const chat = store.getState().allChats.entries[id];
				if (chat.messages[chat.messages.length - 1].author === 'Bot') return;
				store.dispatch(
					fetchMesToChat({ id: nanoid(), text: `Hi ${payload.author}! Погуляем?`, author: 'Bot' }, id)
				);

				if (store.getState().activeChat !== id) store.dispatch(highlightChat(id, true));
			}, 3000);
		} else {
			clearTimeout(interval);
		}
	}
	if (action.type === 'UPDATE_ACTIVE_CHAT') {
		setTimeout(()=>store.dispatch(highlightChat(action.id, false)), 0);
	}

	return next(action);
};
