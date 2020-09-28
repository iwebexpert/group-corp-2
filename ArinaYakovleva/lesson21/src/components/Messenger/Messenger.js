import React, {Component} from 'react';
import './Messenger.css';
import MessagesList from '../MessagesList/MessagesList';
import MessageForm from '../MessageForm/MessageForm';

export default class Messenger extends Component{
    constructor(props){
        super(props);
        this.state ={
            messages: [],
            interval: null,
        }
        
        this.onHandleMessageSend = this.onHandleMessageSend.bind(this);
    }
    
    onHandleMessageSend(newMessage, newAuthor){
        this.setState({
            messages: this.state.messages.concat({message: newMessage, author: newAuthor}),
        });

        clearTimeout(this.state.interval);
    }

    componentDidUpdate(){
        clearTimeout(this.state.interval);

        const {messages} = this.state;
        const name = messages[messages.length-1].author;
        const botAnswer = `Hey, ${name}, this is bot, welcome to chat`;

        this.state.interval = setTimeout(() => {
            this.onHandleMessageSend(botAnswer, 'Bot');
        }, 1000);
    }

    render(){
        const {messages} = this.state;
        return(
            <div className="card container">
                <h1 className="main-header">Messenger</h1>
                <hr />
                <MessageForm onSend={this.onHandleMessageSend} />
                <MessagesList items={messages} />
            </div>
        );   
    }
}