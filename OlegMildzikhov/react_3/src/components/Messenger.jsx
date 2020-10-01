import React, {Component} from 'react';
import {MessagesList} from "../MessageList/";
import {MessageForm} from "../MessageForm";


import './Messenger.css';
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

        return (<div className={"messenger"}>
                <ul className="messages-list">
                    <MessagesList items = {messages} />
                </ul>

            <MessageForm onSend={this.handleMessageSend} />
            </div>
            )
    }
}