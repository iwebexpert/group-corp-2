import React, { Component } from 'react';
import './Root.css';

import MessageList from '../../component/MessagesList/MessagesList';
import Button from '../../component/Button/Button';

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
      ],
    };
  }

  handleClick() {
    const message = { 
      message: "Нормально",
      author: "Vika" 
    };

    this.setState({ ...this.state, messagesData: [...this.state.messagesData, message] });
  };

  render() {
    return(
      <React.Fragment>
        <MessageList messagesData={this.state.messagesData} />
        <Button handleClick={this.handleClick.bind(this)}
                buttonText="Тестовая кнопка one" />
      </React.Fragment>
    );
  }
}