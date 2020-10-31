import {ChatsActionTypes} from '../store/actions/actionTypes'
import {setChatFire, setChatUnfire} from '../store/actions/chats'
import {Middleware} from 'redux'

export const chatFireMiddleware: Middleware = store => next => action => {
	if (action.type === ChatsActionTypes.ADD_NEW_MESSAGE_SUCCESS){
		const {chatId}: any  = action.data
		const matchChatId: any =  store.getState().router.location.pathname.slice(-1)
		if (matchChatId != chatId) {
			store.dispatch(setChatFire(chatId))
		}
	}

	if(action.type === '@@router/LOCATION_CHANGE') {
		const matchChatId: any =  store.getState().router.location.pathname.slice(-1)
		const activeChat: any = store.getState().chats.chatsList[matchChatId]

		if (activeChat && activeChat.fire) {
			store.dispatch(setChatUnfire(matchChatId))
		}
	}

	return next(action)
};