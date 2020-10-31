import {createStore, applyMiddleware, Store} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import {botMiddlewares} from './middlewares/bot';
import {chatAddDeleteMiddlewares} from './middlewares/chatAddDelete';
import {createBrowserHistory, History} from 'history';
import {routerMiddleware} from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';

import {createRootReducer} from './reducers';

export const history: History = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chats', 'messages'],
};

export const initStore = (): {store: Store, persistor: Persistor} => {
    //данные до 
    const initialStore = {};
    const store: Store = createStore(
        persistReducer(persistConfig, createRootReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(logger, botMiddlewares, routerMiddleware(history),apiMiddleware,chatAddDeleteMiddlewares,
            )));

    const persistor: Persistor = persistStore(store);
    return {store, persistor};
};