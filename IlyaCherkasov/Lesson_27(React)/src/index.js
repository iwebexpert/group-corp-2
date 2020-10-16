import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import '../public/index.scss';
import {PersistGate} from 'redux-persist/integration/react'

import Routing from './helpers/Routing';
import {initStore, history} from './redux/store';

const {store, persistor} = initStore();

ReactDom.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Routing />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('.root')
);