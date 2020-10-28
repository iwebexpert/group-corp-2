import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import {botMiddlewares} from './middlewares/bot';
import {chatAddDeleteMiddlewares} from './middlewares/chatAddDelete';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';

import {createRootReducer} from './reducers';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chats', 'messages'],
};

// export const store = createStore(createRootReducer(history), composeWithDevTools(applyMiddleware(logger, botMiddlewares, routerMiddleware(history))));
export const initStore = () => {
    //данные до 
    const initialStore = {};
    const store = createStore(
        persistReducer(persistConfig, createRootReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(logger, botMiddlewares, routerMiddleware(history),apiMiddleware,chatAddDeleteMiddlewares,
            )));

    const persistor = persistStore(store);
    return {store, persistor};
}