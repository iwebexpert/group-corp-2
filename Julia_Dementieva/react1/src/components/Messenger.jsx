import React, { Component } from 'react'
import MessageList from './MessageList';
import MessageForm from './MessageForm';

export class Messenger extends Component {
    constructor(props){
        super(props);
        this.styles = {
            color: 'green',
        }
        this.stylesH2 = {
            color: 'red'
        }
    }

    state ={
        messages: [],
        answerRobot: ['Чем могу помочь?','Привет, какая хорошая погода!','Добрый день!', 'Hi'],
    };

    handleMessageSend = (message) => {
        this.setState({messages: this.state.messages.concat([message])});
    };

    // С помощью floar and random получаю индекс массива answerRobot, генерация числа от 0 до length-1
    // Math.floor(Math.random() * (max - min + 1)) + min -- макс и мин включительно
    randomAnswerRobot = () => {
        return this.state.answerRobot[Math.floor(Math.random() * this.state.answerRobot.length )];
    }

    lastMessageAuthor = () => {
        return this.state.messages[this.state.messages.length-1].author;
    }

    componentDidUpdate() {

        if (this.state.messages.length % 2 === 1) {  
            setTimeout(() =>{
                this.setState(
                    { messages: [ ...this.state.messages, {author: `Robot`, text: `${this.lastMessageAuthor()}, ${this.randomAnswerRobot()}`}] });
            }, 1000);
        }
    }
 

    render() {
        const {messages} = this.state;

        return (
            <div style={this.styles}>
                <h2 style={this.stylesH2}>Chat with the robot</h2>
                <MessageList  items={messages}/>
                <MessageForm onSend={this.handleMessageSend} />
            </div>
        )
    }
}

export default Messenger
