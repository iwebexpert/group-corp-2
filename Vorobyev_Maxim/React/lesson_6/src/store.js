import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { botMiddlewares } from './middlewares/robot';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import {routerMiddleware} from 'connected-react-router';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();

import { createRootReducer } from 'reducers';

const persistConfig = {
  key: 'app',
  storage,
}

export const initStore = () => {
  const initialStore = {};
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(applyMiddleware(botMiddlewares, routerMiddleware(history)))
  );

  const persistor = persistStore(store);
  return { store, persistor }
}