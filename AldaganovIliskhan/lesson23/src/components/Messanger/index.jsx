import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { nanoid } from 'nanoid'

// import { chats } from '../helpers/chats'
import { MessagesList } from '../MessagesList';
import { MessageForm } from '../MessageForm';

let interval = null;

export class Messanger extends Component {
    // state = {
    //     chats
    // };

    handleMessageSend = (message) => {

        const { chats } = this.props;
        const { match } = this.props;
        message.id = nanoid();
        const chat = chats[match.params.id];
        // chat.messages = this.messages.concat([message]);
        chat.messages = [...this.messages, message];
        chats[match.params.id] = chat;
        this.setState({ chats });
        clearInterval(interval);
        console.log(chat.messages)

    };

    componentDidUpdate() {
        if (!this.messages) {
            return;
        }
        const { author } = this.messages[this.messages.length - 1];
        if (author !== 'Bot') {
            clearInterval(interval);
            interval = setInterval(() => {
                this.handleMessageSend({ text: `Hi, ${author}! Бот на связи...`, author: 'Bot' });
            }, 3000);
        }
    }
    get messages() {
        const { chats } = this.props;
        const { match } = this.props;
        let messages = null;
        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }
    render() {
        const messages = this.messages;
        return (
            <Grid item xs={9}>
                <div className="messanger">
                    <div className="messages__list">
                        {messages && <MessagesList items={messages} />}
                    </div>
                    <div className="messages__form">
                        <MessageForm onSend={this.handleMessageSend} />
                    </div>
                </div>
            </Grid>
        );
    }
}