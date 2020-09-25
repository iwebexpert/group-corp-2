import React from 'react';
import ReactDom from 'react-dom';
import "./css/main.css";
import Messenger from './components/Messenger.jsx';


ReactDom.render(
    <>
        <Messenger />
    </>
    , document.getElementById('root'));