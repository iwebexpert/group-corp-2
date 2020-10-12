import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { createRootReducer } from 'reducers'
import { botMiddleware } from './middlewares/bot'

export const history = createBrowserHistory();

export const store = createStore(createRootReducer(history),
  composeWithDevTools(applyMiddleware(logger, botMiddleware, routerMiddleware(history))))