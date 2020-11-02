import { ChatsActionType, addMessageThunkCreator } from '../actions/chats';
import { getBotMessage } from '../../Helpers/bot';
import { Middleware } from "redux";


export const botMiddleWare: Middleware = store => next => action => {
	if(action.type === ChatsActionType.ADD_MESSAGE){
		clearInterval(store.getState().chats.timer);
		const {author, id} = action;
		let botText = getBotMessage(author);
		if(author !== 'Bot'){
			store.getState().chats.timer = setTimeout(() => {
				// @ts-ignore. Тут нужно сделать, чтобы стандартный диспатч мог перерабатывать
				// thunk, но я пробовал все, что есть в интернете, ничего не вышло, к сожалению
				//поэтому оставил ts-ignore, напишите как исправить пожалуйста
				store.dispatch(addMessageThunkCreator(id, 'Bot', botText));
			}, 1000);
		}
	}
	return next(action);
}
