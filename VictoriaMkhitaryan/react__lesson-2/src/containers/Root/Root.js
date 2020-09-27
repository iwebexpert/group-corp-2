import React, { Component } from 'react';
import './Root.css';

import MessageList from '../../component/MessagesList/MessagesList';
import Button from '../../component/Button/Button';
import MessageForm from '../../component/MessageForm/MessageForm';

export default class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesData: [
        {
          message: "Привет",
          author: "WebDev"
        }, {
          message: "Hi",
          author: "WebDev"
        }, {
          message: "Тестовое сообщение",
          author: "WebDev"
        }
      ]
    };
  }

  handleMessageSend = (message) => {
    console.log(message);
    this.setState({ ...this.state, messagesData: [...this.state.messagesData, message] });
};

  render() {
    return(
      <>
        <MessageList messagesData={this.state.messagesData} />
        <MessageForm handleMessageSend={this.handleMessageSend} />
      </>
    );
  }
}