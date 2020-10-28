import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history/es";
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import {apiMiddleware} from "redux-api-middleware";
import reduxThunk from 'redux-thunk';

import {createRootReducer} from './reducers';
import {botMiddleware} from "./middlewares/bot";
import {fireMiddleware} from "./middlewares/fireMsg";

export const history = createBrowserHistory();

const persistConfig = {
    key: 'app',
    storage,
    blacklist: ['chatsReducer', 'userProfile']
};

export const initStore = () => {
    const initialStore = {};
    const store = createStore(
        persistReducer(persistConfig, createRootReducer(history)),
        initialStore,
        composeWithDevTools(applyMiddleware(botMiddleware, fireMiddleware, routerMiddleware(history), apiMiddleware, reduxThunk)));
    const persistor =persistStore(store);
    return {store, persistor};
}






