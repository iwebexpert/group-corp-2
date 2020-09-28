import React, { Component } from 'react';

import { MessagesList } from './MessagesList';
import { MessageForm } from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: []
    };

    handleMessageSend = (message) => {
        this.setState({ messages: this.state.messages.concat([message]) });
        console.log(message);
    };

    componentDidUpdate() {
        const author = this.state.messages[this.state.messages.length - 1].author;

        if (author === 'BattleMech') return

        this.handleMessageSend({
            text: 'Пользователь с ником ' + author +
                ', покиньте чат.',
            author: 'BattleMech'
        })
    }

    render() {
        const { messages } = this.state;

        return (<div>
            <MessagesList items={messages} />
            <MessageForm onSend={this.handleMessageSend} />
        </div>);
    }
}