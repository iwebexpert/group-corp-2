import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { fireMiddleware } from './middlewares/fire';
import { messageMiddleware } from './middlewares/message';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
};

const middlewares = [
  thunk,
  logger,
  fireMiddleware,
  messageMiddleware,
  routerMiddleware(history)
];

export const initStore = () => {
  const initialStore = {};

  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);
  return { store, persistor };
};