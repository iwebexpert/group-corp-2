import React from "react";
import { nanoid } from "nanoid";

import { MessageForm } from "../MessageForm";
import { MessagesList } from "../MessageList";

import "../../src/App.scss";

export class Messenger extends React.Component {
  interval = null;

  list = React.createRef();

  scrollChat = () => {
    const listItem = this.list.current;
    listItem.scrollTop = 9999;
  };

  onMessageSend = (message) => {
    message.id = nanoid();

    const { chats, match } = this.props;
    const chat = chats[match.params.id];

    chat.messages = this.messages.concat([message]);

    const time = new Date();
    message.time = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour24: true,
    });
    this.setState({ chats: chats, [match.params.id]: chat });

    this.scrollChat();
    clearInterval(this.interval);
  };

  componentDidUpdate() {
    if (this.messages.length === 0) {
      return;
    }
    const username = this.messages[this.messages.length - 1].author;

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

    this.interval = setInterval(() => {
      this.onMessageSend(botText);
    }, 1500);
  }

  get messages() {
    const { chats, match } = this.props;

    let messages = null;

    if (match && chats[match.params.id]) {
      messages = chats[match.params.id].messages;
    }

    return messages;
  }

  render() {
    const messages = this.messages;
    const { chats, match } = this.props;
    const chatTitle = chats[match.params.id].title;
    return (
      <div className="chat">
        <div className={this.props.classchattitle}>{chatTitle}</div>
        <div className="messages-list" ref={this.list}>
          <MessagesList messages={messages} class={this.props.classlist} />
        </div>
        <div className="form">
          <MessageForm
            onSend={this.onMessageSend}
            class={this.props.classform}
          />
        </div>
      </div>
    );
  }
}
