import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react'

import {initStore, history} from "./store";
import './scss/style.scss';

import Layout from "./components/Layout";

const {store, persistor} = initStore();

ReactDom.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Layout/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));