import React, { Component } from "react";

import { MessagesList } from "./MessagesList";
import { MessageForm } from "./MessageForm";

export class Messenger extends Component {
  state = {
    messages: [{ text: `Рад тебя видеть!`, author: "Bot Bob" }],
  };

  interval = null;

  handleMessageSend = (message) => {
    this.setState({ messages: this.state.messages.concat([message]) });
    clearInterval(this.interval);
  };

  componentDidUpdate() {
    clearInterval(this.interval);

    const lastAuthor = this.state.messages[this.state.messages.length - 1]
      .author;

    const messagesBot = [
      `В России выявили более 7 тысяч зараженных COVID-19, так что, ${lastAuthor}, носи маску!`,
      `Меня звут Bob, приятно познакомиться, ${lastAuthor}`,
      `${lastAuthor}, почему люди такие шумные?`,
      `Извини, ${lastAuthor}, у меня только несколько реплик, хозяин не научил меня отвечать правильно :(`,
      `Мне интересно всё, что ты пишешь, ${lastAuthor}!`,
    ];
    const messageBot = {
      text: messagesBot[Math.floor(Math.random() * messagesBot.length)],
      author: "Bot Bob",
    };

    this.interval = setTimeout(() => {
      this.handleMessageSend(messageBot);
    }, 1000);
  }

  render() {
    const { messages } = this.state;

    return (
      <>
        <header>
          <a className="header-heading" href="/">
            Messenger
          </a>
        </header>
        <div className="messages">
          <MessagesList items={messages} />
        </div>
        <MessageForm onSend={this.handleMessageSend} />
      </>
    );
  }
}
