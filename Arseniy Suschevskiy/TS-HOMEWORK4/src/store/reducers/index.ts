import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import {chatsReducer, ChatsReducerState} from './chats'
import {profileReducer} from './profile'

type AppState = {
	router: any,
	chats: ChatsReducerState,
	profile: any,
}

export const createRootReducer = (history: History) => combineReducers<AppState> ({
	router: connectRouter(history),
	chats: chatsReducer,
	profile: profileReducer
})