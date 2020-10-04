import React, {Component} from 'react';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';
import './messenger.css';
import { nanoid } from "nanoid";

export class Messenger extends Component {
  state = {
    messages: [],
  };

  interval = null;

  getTimeFormat = () => {
    const time = new Date;
    const hours = time.getHours() < 10 ? '0' + +time.getHours() :  time.getHours();
    const minutes = time.getMinutes() < 10 ? '0' + +time.getMinutes() :  time.getMinutes();
    return `${hours}:${minutes}`;
  }

  handleMessageSend = (message) => {
    message.id = nanoid();
    message.time = this.getTimeFormat();
    //message.audio = 
    this.setState({messages: this.state.messages.concat([message])});
    clearInterval(this.interval);
  };

  componentDidUpdate() {
    clearInterval(this.interval);
    const {messages} = this.state; 
    const thisMessageAuthor = messages[messages.length - 1].author;

    this.interval = setTimeout(() => {
      this.handleMessageSend({text: `Привет, ${thisMessageAuthor}. Как дела?`, author: 'Bot'});
    }, 300);
  }

  render() {
    const {messages} = this.state;
    return (
      <div className="messenger">
        <div className="messages-list">
          <MessagesList items={messages}/>
        </div>
        <MessageForm onSend={this.handleMessageSend}/>
      </div>
    );
  }
}