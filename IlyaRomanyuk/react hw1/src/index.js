import React from 'react';
import ReactDom from 'react-dom';
import MessagesList from './components/MessagesList';
import "./css/main.css";
const messagesData = ['Привет', 'Привет2', 'Привет3'];

ReactDom.render(
    <>
        <MessagesList messagesData={messagesData} />
    </>
    , document.getElementById('root'));