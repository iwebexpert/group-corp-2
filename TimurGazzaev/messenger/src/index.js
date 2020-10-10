import React from 'react'
import ReactDom from 'react-dom'
import Messenger from './components/Messenger.jsx'
import {Provider} from "react-redux"
import {initStore, history} from "./store"
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'

const {store, persistor} = initStore()

ReactDom.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Messenger/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
, document.getElementById('root'))
