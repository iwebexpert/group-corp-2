import React from 'react'
import ReactDom from 'react-dom'
import Layout from './containers/Layout/Layout'
import {BrowserRouter, HashRouter} from 'react-router-dom'

ReactDom.render(
    <HashRouter>
        <Layout/>
    </HashRouter>
, document.getElementById('root'));