import React from "react";

import { MessageForm } from "../MessageForm";
import { MessagesList } from "../MessageList";

import "../../App.scss";

export class Messenger extends React.Component {
  interval = null;

  list = React.createRef();

  scrollChat = () => {
    const listItem = this.list.current;
    listItem.scrollTop = 9999;
  };

  componentDidUpdate() {
    const { messages, onMessageSend } = this.props;
    if (messages.length === 0) {
      return;
    }
    const username = messages[messages.length - 1].author;

    if (username === "Бот") {
      return;
    }

    this.scrollChat();
    clearInterval(this.interval);

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

    this.interval = setTimeout(() => {
      onMessageSend(botText);
      this.scrollChat();
    }, 1500);
  }

  render() {
    const {
      messages,
      classlist,
      classform,
      onMessageSend,
      chatTitle,
      classchattitle,
    } = this.props;

    return (
      <div className="chat">
        <div className={classchattitle}>{chatTitle}</div>
        <div className="messages-list" ref={this.list}>
          <MessagesList messages={messages} class={classlist} />
        </div>
        <div className="form">
          <MessageForm onSend={onMessageSend} class={classform} />
        </div>
      </div>
    );
  }
}
