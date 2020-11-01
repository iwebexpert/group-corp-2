import {createStore, applyMiddleware, Store} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {routerMiddleware} from 'connected-react-router'
import { createBrowserHistory, History } from 'history'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer, Persistor} from 'redux-persist'
import reduxThunk from 'redux-thunk'

import {rootReducer} from "./reducers"
import {botMiddleware} from "./middlewares/bot"
import {notificationMiddleware} from "./middlewares/notification"

export const history: History = createBrowserHistory()

const persistConfig = {
    key: 'app',
    storage,
    blacklist: ['chats', 'profile'],
}

export const initStore = (): {store: Store, persistor: Persistor} => {
    const initialStore = {}

    const store: Store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initialStore,
        composeWithDevTools(applyMiddleware(botMiddleware, routerMiddleware(history),
            notificationMiddleware, reduxThunk))
    )

    const persistor: Persistor = persistStore(store)
    return {store, persistor}
}
