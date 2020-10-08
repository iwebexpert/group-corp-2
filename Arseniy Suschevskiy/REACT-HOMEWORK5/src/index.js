import React from 'react'
import ReactDom from 'react-dom'
import Layout from './containers/Layout/Layout'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/store'

const app = (
    <Provider store = { store }>
        <HashRouter>
            <Layout/>
        </HashRouter>
    </Provider>
)

ReactDom.render(
    app
, document.getElementById('root'));