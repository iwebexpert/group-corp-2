import {addNewMessage} from '../store/actions/chats'
import {ChatsActionTypes} from '../store/actions/actionTypes'
import {ThunkMiddleware} from 'redux-thunk'
let timer: NodeJS.Timeout

export const botMiddleware: ThunkMiddleware = store => next => action => {
	if(action.type === ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS){
		const {author, chatId}: {author: string, chatId: number} = action.message
		const message: messageTypeRequest = {
			text: `Hi, ${author}, im Robot!`,
			author: 'Robot'
		}
		if(author !== 'Robot'){
				timer = setTimeout(() => {
					store.dispatch(addNewMessage(message, chatId))
				}, 3000)
		} else {
			clearTimeout(timer)
		}
	}

	return next(action)
}