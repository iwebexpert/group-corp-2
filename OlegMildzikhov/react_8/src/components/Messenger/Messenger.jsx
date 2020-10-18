import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {MessagesList} from "../MessageList/";
import {MessageForm} from "../MessageForm";

import './Messenger.css';

export const Messenger = (props) => {

    const {messages, handleMessageSend} = props;
    return (<BrowserRouter>
            <div className={"messenger"}>
                <div className="messages-list">
                    {messages ? <MessagesList items={messages}/> : <div>Выберите чат слева</div>}
                </div>
                {messages && <MessageForm onSend={handleMessageSend}/>}
            </div>
        </BrowserRouter>
    )
}