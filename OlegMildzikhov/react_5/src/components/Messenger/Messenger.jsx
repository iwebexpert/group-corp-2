import React, {Component} from 'react';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import {MessagesList} from "../MessageList/";
import {MessageForm} from "../MessageForm";

import './Messenger.css';
import ListItemText from "@material-ui/core/ListItemText";

export class Messenger extends Component {





    render() {
        console.log('messenger',this.state, this.props);
        const {messages, handleMessageSend} = this.props;
        console.log(messages)
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
}