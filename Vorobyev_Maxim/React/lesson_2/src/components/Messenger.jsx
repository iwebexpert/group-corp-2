import React, {Component} from 'react';
import {MessagesList} from './MessagesList';
import {MessageForm} from './MessageForm';

export class Messenger extends Component {
  state = {
    messages: [{text: "Привет", author: "Станислав"}, {text: "Hi", author: "Stanislaus"}, {text: "Hallo", author: "Stanislaw"}],
  };

  handleMessageSend = (message) => {
    this.setState({messages: this.state.messages.concat([message])});
    clearInterval(this.interval);
  };

  componentDidUpdate() {
    clearInterval(this.interval);
    const {messages} = this.state; 
    const thisMessageAuthor = messages[messages.length - 1].author;
    this.interval = setInterval(() => {
      this.handleMessageSend({
        text: `Привет, ${thisMessageAuthor}, вам что-то нужно?`,
        author: "Robot", 
      });
    }, 500);
  }

  render() {
    const {messages} = this.state;
    return <div>
      <MessagesList items={messages}/>
      <MessageForm onSend={this.handleMessageSend}/>
    </div>;
  }
}