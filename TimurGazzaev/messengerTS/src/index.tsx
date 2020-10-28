import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from "react-redux"
import {initStore, history} from "./store"
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'
import {Messenger} from "./components/Messenger"

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
