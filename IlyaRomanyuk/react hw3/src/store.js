import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import { composeWithDevTools } from 'redux-devtools-extension';
import { botMiddware } from "./midlewares/bot";
import { activeChatMiddleware } from "./midlewares/activeChat";
import reduxThunk from 'redux-thunk';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'app',
    storage,
    blacklist: ['chats', 'profile'],
};


export const initStore = () => {
    const initialStore = {};

    const store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(botMiddware, activeChatMiddleware, routerMiddleware(history), reduxThunk
            )));

    const persistor = persistStore(store);
    return { store, persistor };
};