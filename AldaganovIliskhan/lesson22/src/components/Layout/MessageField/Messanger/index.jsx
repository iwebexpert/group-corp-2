import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { nanoid } from 'nanoid'

import { MessagesList } from '../MessagesList';
import { MessageForm } from '../MessageForm';


export class Messanger extends Component {
    state = {
        messages: [
            { author: 'Web1', text: 'Привет', id: nanoid() },
            { author: 'Web1', text: 'Hi', id: nanoid() },
            { author: 'Web1', text: 'Тестовое сообщение', id: nanoid() }],
    };

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({ messages: this.state.messages.concat([message]) });
    };

    componentDidUpdate() {
        const { author } = this.state.messages[this.state.messages.length - 1];
        if (author !== 'Bot') {
            setTimeout(() => {
                this.handleMessageSend({ text: `Hi, ${author}! Бот на связи...`, author: 'Bot' });
            }, 1000);
        }
    }

    render() {
        const { messages } = this.state;

        return (
            <Grid item xs={9}>
                <div className="messanger">
                    <div className="messages__list">
                        <MessagesList items={messages} />
                    </div>
                    <div className="messages__form">
                        <MessageForm onSend={this.handleMessageSend} />
                    </div>

                </div>
            </Grid>
        );
    }
}