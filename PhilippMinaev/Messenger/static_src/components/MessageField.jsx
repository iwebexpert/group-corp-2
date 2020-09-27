import React from "react";
import Message from "./Message";

export default class MessageField extends React.Component {
  state = {
    messages: [
      { text: "Привет!", author: "Робот" },
      { text: "Как дела?", author: "Робот" },
    ],
  };

  handleClick = () => {
    this.setState({
      messages: [...this.state.messages, { text: "Нормально", author: "Я" }],
    });
  };

  render() {
    const messageElements = this.state.messages.map((message, index) => (
      <Message key={index} text={message.text} author={message.author} />
    ));

    return (
      <div>
        {messageElements}
        <button onClick={this.handleClick}>Отправить сообщение</button>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.messages.length % 2 === 1) {
      // Остаток от деления на 2
      setTimeout(
        () =>
          this.setState({
            messages: [
              ...this.state.messages,
              { text: "Не приставай ко мне, я робот!", author: "Робот" },
            ],
          }),
        1000
      );
    }
  }
}
