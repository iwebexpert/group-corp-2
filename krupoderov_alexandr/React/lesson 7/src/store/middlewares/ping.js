import {ADD_MESSAGE_BOT, fire} from '../ChatsReducer';

export const pingMiddleware = store => next => action => {
	if (action.type === ADD_MESSAGE_BOT && action.author === 'Bot') {
		if (+action.chatId !== +store.getState().chats.activeChat) {
			store.dispatch(fire(action.chatId));
		}
	}
	return next(action);
}
