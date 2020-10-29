import React from 'react'
import ReactDom from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

import { routes } from './routes'
import { initStore, history } from './store'

const { store, persistor } = initStore()

ReactDom.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route, index) => (<Route key={index} {...route} />))}
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root'))

/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/