import React, {Component} from 'react';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';
import './Messenger.css';
import { nanoid } from "nanoid";

export class Messenger extends Component {
  state = {
    messages: [],
  };

  handleMessageSend = (message) => {
    message.id = nanoid();
    this.setState({messages: this.state.messages.concat([message])});
  };

  componentDidUpdate() {
    const {messages} = this.state; 
    const thisMessageAuthor = messages[messages.length - 1].author;
    const thisTime = messages[messages.length - 1].time;
    if (thisMessageAuthor !== 'Bot') {
      setTimeout(() => {
        this.handleMessageSend({text: `Привет, ${thisMessageAuthor}. Как дела?`, author: 'Bot'});
      }, 200);
    }
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