import React, {Component} from 'react'

import {MessagesList} from './MessagesList'
import {MessageForm} from './MessageForm'

export class Messenger extends Component {
    state = {
        messages: [{author: 'Тимур', text: 'Хорошо, пока'}, {author: 'Бот', text: 'До скорой встречи, Тимур'}],
    }

    handleMessageSend = (message) => {
        this.setState({messages: this.state.messages.concat([message])})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.messages !== prevState.messages) {
            if(this.state.messages[this.state.messages.length - 1]['author'] === 'Бот') {
                return
            }
            this.handleMessageSend({author: 'Бот', text: `Привет, ${this.state.messages[this.state.messages.length - 1].author}`})
        }
    }

    render(){
        const {messages} = this.state;

        return (<div>
            <MessagesList items={messages} />
            <MessageForm onSend={this.handleMessageSend} />
        </div>)
    }
}
