import React, {Component} from 'react';

import {MessagesList} from './MessagesList';
import {MessageForm} from './MessageForm';

export class Messenger extends Component {
    state = {
        messages: [{text: 'Привет', author: 'WebDev'}, {text: 'Hi', author: 'WebDev'}, {text: 'Тестовое сообщение', author: 'WebDev'}]
    };

    interval = null;

    handleMessageSend = (message) => {
        this.setState({messages: this.state.messages.concat([message])});
    };

    componentDidUpdate(){
        const lastAuthor = this.state.messages[this.state.messages.length - 1].author;
        const lastMess = this.state.messages[this.state.messages.length - 1].text.split("").reverse().join("");;

        if(lastAuthor!='Christopher Nolan'){
            const answer = {text:`${lastMess} - reverse special for ${lastAuthor} ;)`, author: 'Christopher Nolan'};
        
            this.interval = setTimeout(() =>{
                this.handleMessageSend(answer);
            }, 1000);
        }
    };

    render(){
        const {messages} = this.state;

        return (<div>
            <MessagesList items={messages} />
            <MessageForm onSend={this.handleMessageSend} />
        </div>);
    };
};