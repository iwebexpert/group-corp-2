import {addNewMessage} from '../store/actions/chats'
import {ChatsActionTypes} from '../store/actions/actionTypes'
import {ThunkMiddleware} from 'redux-thunk'
let timer: any = null

export const botMiddleware: ThunkMiddleware = store => next => action => {
	if(action.type === ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS){
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