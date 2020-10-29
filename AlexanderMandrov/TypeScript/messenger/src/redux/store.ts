import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, History } from 'history';
import {
  persistStore,
  persistReducer,
  Persistor,
  WebStorage,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { apiMiddleware } from 'redux-api-middleware';
import { fireMiddleware } from './middlewares/fire';
import { messageMiddleware } from './middlewares/message';
import { createRootReducer } from './rootReducer';

export const history: History = createBrowserHistory();

const persistConfig: {
  key: string;
  storage: WebStorage;
  blacklist: string[];
} = {
  key: 'root',
  storage,
  blacklist: ['chatsReducer', 'profileReducer'],
};

const middlewares = [
  apiMiddleware,
  thunk,
  logger,
  fireMiddleware,
  messageMiddleware,
  routerMiddleware(history),
];

export const initStore = (): { store: Store; persistor: Persistor } => {
  const initialStore = {};

  const store: Store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};
