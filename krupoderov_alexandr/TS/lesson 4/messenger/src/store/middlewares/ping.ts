import { Middleware } from 'redux';
import { ChatsActionType, fire } from '../actions/chats';

const pingMiddleware: Middleware = store => next => action => {
	if (action.type === ChatsActionType.ADD_MESSAGE_BOT && action.author === 'Bot') {
		if (+action.chatId !== +store.getState().chats.activeChat) {
			store.dispatch(fire(action.chatId));
		}
	}
	return next(action);
};

export { pingMiddleware }