import React from 'react';
import ReactDom from 'react-dom';
import './scss/style.scss';
import Messenger from './components/Messenger.jsx';
import { BrowserRouter as Router } from "react-router-dom";


ReactDom.render(
    <Router>
        <Messenger />
    </Router>
    , document.getElementById('root'));