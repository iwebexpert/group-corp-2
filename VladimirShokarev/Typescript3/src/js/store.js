import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from "../reducers";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { newMessageAlert } from "../middlewares/newMessageAlert";
import { botMiddware } from "../middlewares/bot";
import { apiMiddleware } from 'redux-api-middleware';
import reduxThunk from 'redux-thunk';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'app',
    storage,
    blacklist: ['chats', 'profile', 'messages'],
};

export const initStore = () => {
    const initialStore = {};
    const store = createStore(
        persistReducer(persistConfig, createRootReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), apiMiddleware, logger, botMiddware, newMessageAlert
            )));

    const persistor = persistStore(store);
    return { store, persistor };
};