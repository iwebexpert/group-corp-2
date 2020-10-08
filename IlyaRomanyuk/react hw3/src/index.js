import React from 'react';
import ReactDom from 'react-dom';
import './scss/style.scss';
import Messenger from './components/Messenger.jsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from "react-router-dom";


ReactDom.render(
    <Provider store={store}>
        <Router>
            <Messenger />
        </Router>
    </Provider>
    , document.getElementById('root'));