import React from 'react';
import ReactDom from 'react-dom';
import './scss/style.scss';
import Messenger from './components/Messenger.jsx';


ReactDom.render(
    <>
        <Messenger />
    </>
    , document.getElementById('root'));