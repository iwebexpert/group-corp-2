import React, { Component } from 'react';

import { MessagesList } from './MessagesList';
import { MessageForm } from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: [],
    };
    interval = null;
    handleMessageSend = (message) => {
        this.setState({ messages: this.state.messages.concat([message]) });
        clearInterval(this.interval);
    };
    componentDidUpdate() {
        clearInterval(this.interval);
        this.lastAuthor = this.state.messages[this.state.messages.length - 1].author;
        this.interval = setInterval(() => {
            this.handleMessageSend({
                text: `Привет, ${this.lastAuthor}`,
                author: 'Robot'
            });
        }, 1000);
    };
    render() {
        const { messages } = this.state;
        return (<div>
            <MessagesList items={messages} />
            <MessageForm onSend={this.handleMessageSend} />
        </div>);
    }
}