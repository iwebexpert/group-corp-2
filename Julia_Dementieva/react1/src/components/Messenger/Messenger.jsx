import React, { Component } from 'react'
import {ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';

import './Messenger.css';

export class Messenger extends Component {

    handleMessageSend = (message) => {
        const { onAdd } = this.props;
        if (typeof (onAdd) === 'function'){
            onAdd(message);
        }
    };

    // С помощью floar and random получаю индекс массива answerRobot, генерация числа от 0 до length-1
    // Math.floor(Math.random() * (max - min + 1)) + min -- макс и мин включительно
    randomAnswerRobot = () => {
        const {answerRobot} = this.props;
        return answerRobot[Math.floor(Math.random() * answerRobot.length )];
    }

    lastMessageAuthor = (minusMessage) => {
        
        return this.props.messages[this.props.messages.length-minusMessage].author;
    }

    componentDidUpdate() {
        const {messages, nameRobot} = this.props;
        setTimeout(() =>{
            if(messages.length > 0 && this.lastMessageAuthor(1)!==nameRobot){ 
                this.setState(
                    this.handleMessageSend({text: `${this.lastMessageAuthor(1)}, ${this.randomAnswerRobot()}`, author: `${nameRobot}`}));
                }
        }, 3000);
    }
    
    render() {
        const {authorChat, namePerson, avatarChat, messages } = this.props;
        return (
            <div className="messenger">
                <div className="messages-info">
                    <ListItem alignItems="center">   
                        <ListItemAvatar>
                        <Avatar src={avatarChat} />  
                        
                        </ListItemAvatar>
                        <ListItemText
                        primary={authorChat}
                        /> 
                    </ListItem>
                </div>
                <div className="messages-list">
                    {messages.length > 0 ? <MessageList  items={messages}/> : <div>Пока в чате сообщений нет</div>}
                </div>
                <div className="message-form"> 
                    <MessageForm onSend={this.handleMessageSend} person={namePerson}/>
                </div>           
            </div>
        )
    }
}

