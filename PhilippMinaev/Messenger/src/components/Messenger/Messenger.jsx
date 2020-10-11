import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { MessageList } from "../MessageList";
import { MessageForm } from "../MessageForm";
import { Error } from "../../pages/Error";

import "./Messenger.css";

export class Messenger extends Component {
  handleMessageSend = (message) => {
    const { onAdd } = this.props;
    if (typeof onAdd === "function") {
      onAdd(message);
    }
  };

  render() {
    const { authorChat, nameProfile, avatarChat, messages } = this.props;
    return messages ? (
      <div className="messenger">
        <div className="messages-info">
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar src={avatarChat} />
            </ListItemAvatar>
            <ListItemText primary={authorChat} />
          </ListItem>
        </div>
        <div className="messages-list">
          {messages.length > 0 ? (
            <MessageList items={messages} />
          ) : (
            <div>Empty chat.</div>
          )}
        </div>
        <div className="message-form">
          <MessageForm onSend={this.handleMessageSend} profile={nameProfile} />
        </div>
      </div>
    ) : (
      <Error />
    );
  }
}
