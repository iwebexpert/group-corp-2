import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import { createRootReducer } from 'reducers'
import { botMiddleware } from './middlewares/bot'
import { chatsUnfire } from './middlewares/chatsFire'

export const history = createBrowserHistory();

const persistConfig = {
  key: 'app',
  storage,
};

export const initStore = () => {
  const initialStore = {};

  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(
      applyMiddleware(botMiddleware, routerMiddleware(history), chatsUnfire
      )));

  const persistor = persistStore(store);
  return { store, persistor };
};