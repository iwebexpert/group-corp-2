import React, { Component } from 'react'
import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';

import { nanoid } from 'nanoid'

import './Messenger.css';

export class Messenger extends Component {
    constructor(props){
        super(props);
    }

    state ={
        messages: [
            {author: 'Web', text: 'Привет', id: nanoid()}, 
        ],
        nameRobot: "Robot",
        answerRobot: ['Чем могу помочь?','Привет, какая хорошая погода!','Добрый день!', 'Hi'],
    };

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({messages: this.state.messages.concat([message])});
    };

    // С помощью floar and random получаю индекс массива answerRobot, генерация числа от 0 до length-1
    // Math.floor(Math.random() * (max - min + 1)) + min -- макс и мин включительно
    randomAnswerRobot = () => {
        return this.state.answerRobot[Math.floor(Math.random() * this.state.answerRobot.length )];
    }

    lastMessageAuthor = (minusMessage) => {
        return this.state.messages[this.state.messages.length-minusMessage].author;
    }

    componentDidUpdate() {
        // Исправила баг, теперь если один и тот же автор пишет несколько сообщений сразу, то робот ответит только один раз
        // Появился новый баг, если два разных автора пишут в чат, то робот во второй раз отвечает самому себе(т.к. в this.lastMessageAuthor(1))
        // будет его имя, не стала исправлять,т.к. скоро все равно messenger разобьется на несколько чатов, следовательно, будет только один автор 
        if (this.lastMessageAuthor(1) !== this.state.nameRobot && this.lastMessageAuthor(1) !== this.lastMessageAuthor(2)) {  
            setTimeout(() =>{
                this.setState(
                    { messages: [ ...this.state.messages, {author: `${this.state.nameRobot}`, text: `${this.lastMessageAuthor(1)}, ${this.randomAnswerRobot()}`, id: nanoid()}] });
            }, 2000);
        }
    }
 

    render() {
        const {messages} = this.state;

        return (
            <div className="messenger">
                <div className="messages-list">
                    <MessageList  items={messages}/>
                </div>
                <div className="message-form"> 
                    <MessageForm onSend={this.handleMessageSend} />
                </div>
               
            </div>
        )
    }
}

