import CreateSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import {createRootReducer} from "./Reducers/rootReducer";
import {createBrowserHistory} from 'history';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'
import {sagaWatcher} from "./SAGA/sagas";
import { composeWithDevTools } from 'redux-devtools-extension';
import {loggerMiddleware} from "./middlewares/logger";
import {botMiddleware} from "./middlewares/bot";
import {getChatSelectorInfo} from "./middlewares/getChatSelectorInfo";


export const history = createBrowserHistory();
const persistConfig = {
    key: 'app',
    storage
};
const sagaMiddleware = CreateSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history), loggerMiddleware, botMiddleware,  getChatSelectorInfo];
const enhancers = [];
enhancers.push(applyMiddleware(...middleware));
const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
export const store = createStore(persistedReducer, composeWithDevTools(...enhancers));
export const persistor = persistStore(store);
sagaMiddleware.run(sagaWatcher);





