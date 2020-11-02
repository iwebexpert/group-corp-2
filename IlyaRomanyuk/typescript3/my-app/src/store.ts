import { createStore, applyMiddleware, Store } from "redux";
import { rootReducer } from "./reducers";
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, Persistor } from 'redux-persist';

import { composeWithDevTools } from 'redux-devtools-extension';
import { botMiddware } from "./midlewares/bot";
import { activeChatMiddleware } from "./midlewares/activeChat";
import reduxThunk from 'redux-thunk';

export const history: History = createBrowserHistory();

const persistConfig = {
    key: 'app',
    storage,
    blacklist: ['chats', 'profile'],
};


export const initStore = (): { store: Store, persistor: Persistor } => {
    const initialStore = {};

    const store: Store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(botMiddware, activeChatMiddleware, routerMiddleware(history), reduxThunk
            )));

    const persistor: Persistor = persistStore(store);
    return { store, persistor };
};