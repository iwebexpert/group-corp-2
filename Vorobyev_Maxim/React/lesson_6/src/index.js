import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'components/Layout';
import { ConnectedRouter } from 'connected-react-router';
import { initStore, history } from './store';
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = initStore();

ReactDom.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));