import React, { Component } from "react";

import { HeaderContainer } from "../../containers/HeaderContainer";

import { ChatForm } from "../ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";

import { Box, ListItem, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

import "./Messenger.css";

export class Messenger extends Component {
  render() {
    const {
      messages,
      handleMessageSend,
      handleAddChat,
      chats,
      title,
    } = this.props;

    const chatTitle = <h3 className="chat-name">{title}</h3>;
    const data = Array.from(chats);
    const chatsList = data.map((item) => (
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
            <HeaderContainer />
          </Grid>
          <Grid item xs={4}>
            <h3 className="heading-chats">Список чатов</h3>
            <Box className="box" border={1} borderColor="grey.200">
              {chatsList}
            </Box>
            <ChatForm onSend={handleAddChat} />
          </Grid>
          <Grid item xs={8}>
            {chatTitle}
            {messages ? (
              <MessagesList items={messages} />
            ) : (
              <h4 className="choose-chat">Выберите чат слева</h4>
            )}
            {messages && <MessageForm onSend={handleMessageSend} />}
          </Grid>
        </Grid>
      </>
    );
  }
}
