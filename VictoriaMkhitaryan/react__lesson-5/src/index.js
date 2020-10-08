import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { routerReducer } from 'react-router-redux';
import './index.css';

import Root from './containers/Root/Root';

import * as reducers from './store/reducers';

const store = createStore(combineReducers({...reducers, routing: routerReducer}), applyMiddleware(thunk));

ReactDom.render(
      <Provider store={store}>
            <Router>
                  <Root />
            </Router>
      </Provider>
, document.getElementById('root'));