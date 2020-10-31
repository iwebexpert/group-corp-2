import {createStore, applyMiddleware, Store} from 'redux'
import { createBrowserHistory, History } from 'history'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer, Persistor} from 'redux-persist'
import {createRootReducer} from './reducers'
import { routerMiddleware } from 'connected-react-router'
import {botMiddleware} from '../middlewares/Robot'
import {chatFireMiddleware} from '../middlewares/chatFire'

export const history: History = createBrowserHistory()

const persistConfig = {
	key: 'app',
	storage,
	blacklist: ['chats', 'profile']
}

export const initStore = (): {store: Store, persistor: Persistor} => {
	const initialStore = {}

	const store = createStore(
		persistReducer(persistConfig, createRootReducer(history)),
		initialStore,
		composeWithDevTools(
			applyMiddleware(
				thunk,
				botMiddleware,
				chatFireMiddleware,
				routerMiddleware(history),
			)))

	const persistor: Persistor = persistStore(store)
	return {store, persistor}
}