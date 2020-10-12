import {ADD_NEW_MESSAGE_TO_CHAT} from '../store/actions/actionTypes'
import {setChatFire, setChatUnfire} from '../store/actions/chats'


export const chatFireMiddleware = store => next => action => {
	if (action.type === ADD_NEW_MESSAGE_TO_CHAT){
		const {chatId} = action
		const matchChatId =  store.getState().router.location.pathname.slice(-1)
		if (matchChatId !== chatId) {
			store.dispatch(setChatFire(chatId))
		}
	}

	if(action.type === '@@router/LOCATION_CHANGE') {
		const matchChatId =  store.getState().router.location.pathname.slice(-1)
		const activeChat = store.getState().chats.chatsList[matchChatId]

		if (activeChat && activeChat.fire) {
			store.dispatch(setChatUnfire(matchChatId))
		}
	}

	return next(action)
}