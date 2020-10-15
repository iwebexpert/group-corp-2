import {ADD_MESSAGE, addMessageThunk} from '../ChatsReducer';
import {getBotMessage} from "../../Helpers/bot";

export const botMiddleWare = store => next => action => {
	if(action.type === ADD_MESSAGE){
		clearInterval(store.getState().chats.timer);
		const {author, chatId} = action;
		let botText = getBotMessage(author);
		if(author !== 'Bot'){
			store.getState().chats.timer = setTimeout(() => {
				store.dispatch(addMessageThunk(parseInt(chatId), 'Bot', botText));
			}, 1000);
		}
	}
	return next(action);
}
