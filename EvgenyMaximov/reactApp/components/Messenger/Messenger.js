import React from "react";
import { nanoid } from "nanoid";

import { MessageForm } from "../MessageForm";
import { MessagesList } from "../MessageList";
import "./Messenger.scss";

export class Messenger extends React.Component {
  state = {
    messages: [],
  };

  interval = null;

  scrollChat = () => {
    const list = document.querySelector(".messages-list");
    list.scrollTop = 9999;
  };

  onMessageSend = (message) => {
    message.id = nanoid();
    this.setState({ messages: this.state.messages.concat([message]) });

    clearInterval(this.interval);
  };

  componentDidUpdate() {
    this.scrollChat();

    clearInterval(this.interval);

    const username = this.state.messages[this.state.messages.length - 1].author;

    const botAnswers = [
      `Привет, ${username}! Я чат-бот...`,
      `Как скажешь, ${username}!`,
      `Чем я могу тебе помочь, ${username}?`,
      `${username}, а какая погода больше всего нравится тебе?`,
      `Это сообщение сгенерирована случайным образом, ${username}, не жди от меня объективности =(`,
      `Рад приветствовать тебя, ${username}! Добро пожаловать в Telegraf!`,
      `Как настроение, ${username}?`,
      `Отлично что ты зашел, ${username}, дашь списать тест Тьюринга?`,
      `Приём-приём, как слышишь, ${username}?`,
      `Плохие новости, ${username}, вчера Facebook разработал чат-бота маминой подруги...`,
    ];

    const rnd = () => Math.floor(Math.random() * botAnswers.length);

    const botText = {
      text: `${botAnswers[rnd()]} `,
      author: "Бот",
    };

    this.interval = setInterval(() => {
      this.onMessageSend(botText);
    }, 1500);
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="messenger">
        <div className="messages-list">
          <MessagesList messages={messages} />
        </div>
        <div className="form">
          <MessageForm onSend={this.onMessageSend} />
        </div>
      </div>
    );
  }
}
