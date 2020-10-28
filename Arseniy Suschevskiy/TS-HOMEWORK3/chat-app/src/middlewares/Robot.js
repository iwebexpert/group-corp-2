import {addNewMessage} from '../store/actions/chats'
import {ADD_NEW_MESSAGE_SUCCESS} from '../store/actions/actionTypes'
let timer = null

export const botMiddleware = store => next => action => {
	if(action.type === ADD_NEW_MESSAGE_SUCCESS){
		const {author, chatId} = action.data

		if(author !== 'Robot'){
				timer = setTimeout(() => {
					store.dispatch(addNewMessage({text: `Hi, ${author}, im Robot!`, author: 'Robot'}, chatId))
				}, 3000)
		} else {
			clearTimeout(timer)
		}
	}

	return next(action)
}