import {createStore, compose, applyMiddleware} from 'redux'
import {rootReducer} from 'reducers'
import thunk from 'redux-thunk'

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose

export const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk)
	)
)