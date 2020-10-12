import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import { rootReducer } from './reducers/rootReducer';
import { botMiddleware } from './middlewares/botMiddleware';
import { fireChatMiddleware } from './middlewares/fireChatMiddleware'

export const history = createBrowserHistory();

const persistConfig = {
  key: 'messengerApp',
  storage,
}

export const initStore = () => {
  const initialStore = {};
  const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    initialStore,
    composeWithDevTools(applyMiddleware(/*logger,*/ fireChatMiddleware, botMiddleware, routerMiddleware(history)))
  )
  const persistor = persistStore(store);
  return { store, persistor };
};