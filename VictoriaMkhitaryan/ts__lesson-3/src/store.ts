import {createStore, applyMiddleware, Store} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';
import reduxThunk from 'redux-thunk';

import { reducers } from './store/reducers';

// import {botMiddleware} from './middlewares/bot';

export const history: History = createBrowserHistory();

const persistConfig = {
    key: 'app',
    storage,
    blacklist: ['chats'],
};

export const initStore = (): {store: Store, persistor: Persistor} => {
    const initialStore = {};

    const store: Store = createStore(
        persistReducer(persistConfig, reducers(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), apiMiddleware, reduxThunk, // botMiddleware,
            )));

            const persistor: Persistor = persistStore(store);
            return {store, persistor};
};