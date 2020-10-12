import { nanoid } from 'nanoid';
import { addNewMessageToChat, highlightChat } from '../actions/chatsAction';

export const botAnswerMiddware = (store) => (next) => (action) => {
	if (action.type === 'ADD_MESSAGE_TO_CHAT') {
		const { data, id } = action;
		if (data.author !== 'Bot') {
			setTimeout(() => {
				store.dispatch(
					addNewMessageToChat({ id: nanoid(), text: `Hi ${data.author}! Погуляем?`, author: 'Bot' }, id)
				);
				store.dispatch(highlightChat(id));
			}, 2000);
			setTimeout(() => {
				store.dispatch(highlightChat(id));
			}, 4000);
		}
	}
	return next(action);
};
