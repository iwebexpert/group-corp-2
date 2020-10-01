import React from 'react';
import { MessagesForm } from './MessagesForm.jsx';
import { MessagesList } from './MessagesList.jsx';

class Messenger extends React.Component {

    state = {
        messages: [{ text: "Привет", person: 'Petr' }],
        isFetching: true
    }

    addNewMessage = (data) => {
        this.setState({
            messages: [...this.state.messages, data]
        })
    }

    componentDidUpdate() {
        const state = this.state.messages;
        const lastPerson = state[state.length - 1].person;

        const defaultAnswerFromBot = {
            text: `${lastPerson}, я просто BOT`,
            person: 'BOT'
        }

        this.time = setTimeout(() => {
            this.addNewMessage(defaultAnswerFromBot);
            clearTimeout(this.time);
        }, 4000)
    }

    render() {
        let { messages } = this.state;

        return (
            <>
                <MessagesList items={messages} />
                <MessagesForm onSend={this.addNewMessage} />
            </>
        )
    }
}

export default Messenger;