import React, { Component } from 'react'
import {ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';
import {Switch, Link, Route} from 'react-router-dom';
import {chats} from '../../helper/chatsData'
import {Paper} from '@material-ui/core';
import { nanoid } from 'nanoid'

import './Messenger.css';

export class Messenger extends Component {
    constructor(props){
        super(props);
    }

    state ={
        nameRobot: "Robot",
        answerRobot: ['Чем могу помочь?','Привет, какая хорошая погода!','Добрый день!', 'Hi'],
    };

    handleMessageSend = (message) => {
        const { onAdd } = this.props;

        if (typeof (onAdd) === 'function'){
            onAdd(this.props.chatId, message);
        }
    };

    // С помощью floar and random получаю индекс массива answerRobot, генерация числа от 0 до length-1
    // Math.floor(Math.random() * (max - min + 1)) + min -- макс и мин включительно
    randomAnswerRobot = () => {
        return this.state.answerRobot[Math.floor(Math.random() * this.state.answerRobot.length )];
    }

    lastMessageAuthor = (minusMessage) => {
        
        return this.messages[this.messages.length-minusMessage].author;
    }

    componentDidUpdate() {

        setTimeout(() =>{
            if(this.messages.length > 0 && this.lastMessageAuthor(1)!==this.state.nameRobot){ 
                this.setState(
                    this.handleMessageSend({text: `${this.lastMessageAuthor(1)}, ${this.randomAnswerRobot()}`, author: `${this.state.nameRobot}`}));
                }
        }, 3000);
            
            
            
    }

    get messages(){
        const {chats} = this.props;
        const {chatId} = this.props;

        let messages = null;

        if(chatId >=0 && chats[chatId]){
            messages = chats[chatId].messages;
        }
        return messages;
    }
    
    render() {
        const messages = this.messages;
        const {chats} = this.props;
        const {chatId} = this.props;
        return (
            <div className="messenger">
                <div className="messages-info">
                    <ListItem alignItems="center">   
                        <ListItemAvatar>
                        <Avatar src={chats[chatId].avatar} />  
                        
                        </ListItemAvatar>
                        <ListItemText
                        primary={chats[chatId].author}
                        /> 
                    </ListItem>
                </div>
                <div className="messages-list">
                    {messages.length > 0 ? <MessageList  items={messages}/> : <div>Пока в чате сообщений нет</div>}
                </div>
                <div className="message-form"> 
                    <MessageForm onSend={this.handleMessageSend} person={this.props.person}/>
                </div>           
            </div>
        )
    }
}

