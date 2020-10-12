import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { Wrap } from 'components/Wrap'

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