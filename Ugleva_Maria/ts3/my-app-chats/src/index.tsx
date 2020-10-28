import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { botAnswerMiddware } from './middlewares/bot';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers/reducer';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();
const persistConfig = {
	key: 'Chats',
	storage,
	blacklist: ['allChats', 'profile'],
};
const initStore = () => {
	const initialStore = {};
	const store = createStore(
		persistReducer(persistConfig, createRootReducer(history)),
		initialStore,
		composeWithDevTools(applyMiddleware(logger, botAnswerMiddware, routerMiddleware(history), apiMiddleware, thunk))
	);
	const persistor = persistStore(store);
	return { store, persistor };
};
const { store, persistor } = initStore();
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
