import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {routerMiddleware} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

import {rootReducer} from "./reducers"
import {botMiddleware} from "./middlewares/bot"
import {notificationMiddleware} from "./middlewares/notification"

export const history = createBrowserHistory()

const persistConfig = {
    key: 'app',
    storage,
}

export const initStore = () => {
    const initialStore = {}

    const store = createStore(
        persistReducer(persistConfig, rootReducer(history)),
        initialStore,
        composeWithDevTools(applyMiddleware(botMiddleware, routerMiddleware(history), notificationMiddleware))
    )

    const persistor = persistStore(store)
    return {store, persistor}
}
