import React from 'react'
import ReactDom from 'react-dom'
import Layout from './containers/Layout/Layout'
import {Provider} from 'react-redux'
import {history, initStore} from './store/store'
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'

const {store, persistor} = initStore()

const app = (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Layout />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
)

ReactDom.render(
    app,
	document.getElementById('root')
)