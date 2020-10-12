import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { routerReducer } from 'react-router-redux';
import './index.css';

import { botMiddleware } from './middlewares/bot';
import { reducers } from './store/reducers';


import Root from './containers/Root/Root';


export const history = createBrowserHistory();

const store = createStore(reducers(history), applyMiddleware(thunk, botMiddleware, routerMiddleware(history),));

ReactDom.render(
      <Provider store={store}>
            <Router history={history}>
                  <Root />
            </Router>
      </Provider>
, document.getElementById('root'));