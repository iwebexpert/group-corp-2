import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  {MessagesList} from './MessageList';
import {MessageForm} from "components/MessageForm";
export class Messenger extends Component {
    state = {
        messages: [
           ],
    };

    componentDidUpdate() {
        const {messages} = this.state;
        if (messages.length % 2 === 1){
            console.log(messages);
        setTimeout(() =>{
            
            this.setState( 
                { messages: [ ...this.state.messages, 
                {author: `Robot`, text: `hello, ${messages[messages.length-1].author}`}]});
            }, 1000);
    }
    }
    
    handleMessageSend = (message) => {
        this.setState({messages: this.state.messages.concat([message])});
        console.log(message);
    }

    render() {
        const {messages} = this.state;

        return (<div>
            <MessagesList items = {messages} />
            <MessageForm onSend={this.handleMessageSend} />
            </div>
            )
    }
}