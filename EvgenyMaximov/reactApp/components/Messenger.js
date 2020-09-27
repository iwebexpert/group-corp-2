import React from "react";
import { MessageForm } from "./MessageForm";
import { MessagesList } from "./MessageList";

export class Messenger extends React.Component {
  state = {
    messages: [],
  };

  interval = null;

  onMessageSend = (message) => {
    this.setState({ messages: this.state.messages.concat([message]) });
    clearInterval(this.interval);
  };

  componentDidUpdate() {
    clearInterval(this.interval);
    const username = this.state.messages[this.state.messages.length - 1].author;

    const botText = {
      text: `Привет, ${username}!`,
      author: "Чат-бот",
    };

    this.interval = setInterval(() => {
      this.onMessageSend(botText);
    }, 1500);
  }

  render() {
    const { messages } = this.state;
    return (
      <>
        <MessagesList messages={messages} />
        <MessageForm onSend={this.onMessageSend} />
      </>
    );
  }
}
