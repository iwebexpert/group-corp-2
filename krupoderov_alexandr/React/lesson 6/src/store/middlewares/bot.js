import {ADD_MESSAGE, addMessage} from '../ChatsReducer';
import {getBotMessage} from "../../Helpers/bot";

export const botMiddleWare = store => next => action => {
	if(action.type === ADD_MESSAGE){
		clearInterval(store.getState().chats.timer);
		const {author, id} = action;
		let botText = getBotMessage(author);
		if(author !== 'Bot'){
			store.getState().chats.timer = setTimeout(() => {
				store.dispatch(addMessage('Bot', id, botText));
			}, 3000);
		}
	}
	return next(action);
}
