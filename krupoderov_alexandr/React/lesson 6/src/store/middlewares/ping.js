import {ADD_MESSAGE, fire} from '../ChatsReducer';

export const pingMiddleware = store => next => action => {
	if (action.type === ADD_MESSAGE && action.author === 'Bot') {
		if (action.id !== store.getState().chats.activeChat) {
			store.dispatch(fire(action.id));
		}
	}
	return next(action);
}
