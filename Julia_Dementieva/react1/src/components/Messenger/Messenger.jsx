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
        // const {chats} = this.state;
        // const {chatId} = this.props;

        // const chat = chats[chatId];

        // message.id = nanoid();
        // chat.messages = this.messages.concat([message])

        // chats[chatId] = chat;

        // this.setState({
        //     chats,
        // });
    };

    // С помощью floar and random получаю индекс массива answerRobot, генерация числа от 0 до length-1
    // Math.floor(Math.random() * (max - min + 1)) + min -- макс и мин включительно
    randomAnswerRobot = () => {
        return this.state.answerRobot[Math.floor(Math.random() * this.state.answerRobot.length )];
    }

    lastMessageAuthor = (minusMessage) => {
        // const messageList = this.state.chats[this.props.chatId].messages;
        // return messageList[messageList.length-minusMessage].author;
        
        return this.messages[this.messages.length-minusMessage].author;
    }

    componentDidUpdate() {
        // Исправила баг, теперь если один и тот же автор пишет несколько сообщений сразу, то робот ответит только один раз
        // Появился новый баг, если два разных автора пишут в чат, то робот во второй раз отвечает самому себе(т.к. в this.lastMessageAuthor(1))
        // будет его имя, не стала исправлять,т.к. скоро все равно messenger разобьется на несколько чатов, следовательно, будет только один автор 
        // if (this.lastMessageAuthor(1) !== this.state.nameRobot && this.lastMessageAuthor(1) !== this.lastMessageAuthor(2)) {  
            setTimeout(() =>{
                if(this.lastMessageAuthor(1)!==this.state.nameRobot){

                
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
                    {messages ? <MessageList  items={messages}/> : <div>Пока в чате сообщений нет</div>}
                </div>
                <div className="message-form"> 
                    {messages && <MessageForm onSend={this.handleMessageSend} person={this.props.person}/>}
                </div>           
            </div>
        )
    }
}

