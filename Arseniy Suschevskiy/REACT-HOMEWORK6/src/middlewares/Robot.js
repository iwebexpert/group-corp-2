import {addNewMessage} from '../store/actions/chats'
import {ADD_NEW_MESSAGE_TO_CHAT} from '../store/actions/actionTypes'
let timer = null

export const botMiddleware = store => next => action => {
	if(action.type === ADD_NEW_MESSAGE_TO_CHAT){
		const {author} = action.message
		const {chatId} = action

		if(author !== 'Robot'){
				timer = setTimeout(() => {
					store.dispatch(addNewMessage({text: `Hi, im Robot!`, author: 'Robot'}, chatId))
				}, 3000)
		} else {
			clearTimeout(timer)
		}
	}

	return next(action)
}