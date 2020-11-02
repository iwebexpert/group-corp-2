import {ChatsActionTypes} from '../store/actions/actionTypes'
import {setChatFire, setChatUnfire} from '../store/actions/chats'
import {Middleware} from 'redux'

export const chatFireMiddleware: Middleware = store => next => action => {
	if (action.type === ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS){
		const chatId: number  = action.message.chatId
		const matchChatId: number =  store.getState().router.location.pathname.slice(-1)
		if (matchChatId != chatId) {
			store.dispatch(setChatFire(chatId))
		}
	}

	if(action.type === '@@router/LOCATION_CHANGE') {
		const matchChatId: number =  store.getState().router.location.pathname.slice(-1)
		const activeChat = store.getState().chats.chatsList[matchChatId]

		if (activeChat && activeChat.fire) {
			store.dispatch(setChatUnfire(matchChatId))
		}
	}

	return next(action)
};