import {createStore, applyMiddleware} from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'
import {createRootReducer} from 'reducers'
import { routerMiddleware } from 'connected-react-router'
import {botMiddleware} from '../middlewares/Robot'
import {chatFireMiddleware} from '../middlewares/chatFire'

export const history = createBrowserHistory()

const persistConfig = {
	key: 'app',
	storage,
}

export const initStore = () => {
	const initialStore = {}

	const store = createStore(
		persistReducer(persistConfig, createRootReducer(history)),
		initialStore,
		composeWithDevTools(
			applyMiddleware(thunk, botMiddleware,chatFireMiddleware, routerMiddleware(history),
			)))

	const persistor = persistStore(store)
	return {store, persistor}
}