import React, { Component } from "react";
import { Header } from "../Header";
import { nanoid } from "nanoid";

import botImg from "./../../img/bot.png";
import manImg from "./../../img/man.png";

import { ChatForm } from "../ChatForm/ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";

import Grid from "@material-ui/core/Grid";
import { Box, ListItem } from "@material-ui/core";

import { Link } from "react-router-dom";

import { chats } from "../../helpers/chatsData";

import "./Messenger.css";

export class Messenger extends Component {
  state = {
    chats,
  };

  interval = null;

  get messages() {
    const { chats } = this.state;
    const { match } = this.props;

    let messages = null;

    if (match && chats[match.params.id]) {
      messages = chats[match.params.id].messages;
    }

    return messages;
  }

  get chatTitle() {
    const { chats } = this.state;
    const { match } = this.props;

    let chatTitle = null;

    if (match && chats[match.params.id]) {
      chatTitle = chats[match.params.id].title;
    }

    return chatTitle;
  }

  handleMessageSend = (message) => {
    const { chats } = this.state;
    const { match } = this.props;

    const chat = chats[match.params.id];
    message.id = nanoid();
    // if (message.author === "Bot Bob") {
    //   message.img = botImg;
    // } else message.img = manImg;

    chat.messages = this.messages.concat([message]);
    chats[match.params.id] = chat;

    this.setState({
      chats,
    });
  };

  componentDidUpdate(PrevProps, prevState) {
    if (
      prevState === this.state ||
      prevState.chats.length !== this.state.chats.length ||
      this.messages === null ||
      this.messages.length == 0
    ) {
      return;
    }
    clearTimeout(this.interval);
    const lastAuthor = this.messages[this.messages.length - 1].author;
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
    if (lastAuthor !== "Bot Bob") {
      this.interval = setTimeout(() => {
        this.handleMessageSend(messageBot);
      }, 1000);
    }
  }

  handleAddChat = (chat) => {
    const { chats } = this.state;

    chat.id = chats.length;
    chat.messages = [
      {
        id: 0,
        author: "Bot Bob",
        img: botImg,
        text: "Приветствую в новом чате!",
      },
    ];

    this.setState({
      chats: [...chats, chat],
    });
  };

  render() {
    const chatTitle = <h3 className="chat-name">{this.chatTitle}</h3>;

    const messages = this.messages;
    const { chats } = this.state;
    const chatsList = chats.map((item) => (
      <div className="chat" key={item.id}>
        <ListItem key={item.id}>
          <Link className="chat-link" to={`/chats/${item.id}`}>
            <h6 className="chat-title">{item.title}</h6>
            <div className="last-message">
              <div className="img">
                <img
                  className="img-author"
                  src={item.messages[item.messages.length - 1].img}
                  alt=""
                />
              </div>
              <div className="message">
                <b className="message__author">
                  {item.messages[item.messages.length - 1].author}
                </b>
                <p className="message__text">
                  {item.messages[item.messages.length - 1].text}
                </p>
              </div>
            </div>
          </Link>
        </ListItem>
        <hr />
      </div>
    ));

    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={4}>
            <h3 className="heading-chats">Список чатов</h3>
            <Box className="box" border={1} borderColor="grey.200">
              {chatsList}
            </Box>
            <ChatForm onSend={this.handleAddChat} />
          </Grid>
          <Grid item xs={8}>
            {chatTitle}
            {messages ? (
              <MessagesList items={messages} />
            ) : (
              <h4 className="choose-chat">Выберите чат слева</h4>
            )}
            {messages && <MessageForm onSend={this.handleMessageSend} />}
          </Grid>
        </Grid>
      </>
    );
  }
}
