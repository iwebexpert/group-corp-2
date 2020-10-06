import React from 'react'
import ReactDom from 'react-dom'
import {Messenger} from './components/Messenger.jsx'
import {Provider} from "react-redux"
import {store} from "./store"

ReactDom.render(
    <Provider store={store}>
        <Messenger/>
    </Provider>
, document.getElementById('root'))
