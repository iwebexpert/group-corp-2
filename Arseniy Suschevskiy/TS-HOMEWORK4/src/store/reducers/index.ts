import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import {chatsReducer} from './chats'
import {profileReducer} from './profile'

export const createRootReducer = (history: History) => combineReducers<RootState> ({
	router: connectRouter(history),
	chats: chatsReducer,
	profile: profileReducer
})