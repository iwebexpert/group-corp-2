import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import './index.css';

import { botMiddleware } from './middlewares/bot';
import { apiMiddleware } from 'redux-api-middleware';
import { reducers } from './store/reducers';

import { Root } from './containers/Root/Root';

export const history = createBrowserHistory();

const persistConfig = {
      key: 'app',
      storage,
      blacklist: ['chats'],
};

const initStore = () => {
      const initialStore = {};

      const store = createStore(
            persistReducer(persistConfig, reducers(history)),
            initialStore,
            applyMiddleware(thunk, botMiddleware, apiMiddleware, routerMiddleware(history)));

      const persistor = persistStore(store);
      return {store, persistor};
}

const { store, persistor } = initStore();


ReactDom.render(
      <Provider store={store}>
            <PersistGate persistor={persistor}>
                  <Router history={history}>
                        <Root />
                  </Router>
            </PersistGate>
      </Provider>
, document.getElementById('root'));