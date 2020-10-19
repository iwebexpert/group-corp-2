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

export const Messenger = ({
  title,
  nameProfile,
  avatarChat,
  messages,
  loadStatus,
  onAdd,
}) => {
  const handleMessageSend = (message) => {
    if (typeof onAdd === "function") {
      onAdd(message);
    }
  };

  switch (loadStatus) {
    case "loaded":
      return (
        <div className="messenger">
          <div className="messages-info">
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar src={avatarChat} />
              </ListItemAvatar>
              <ListItemText primary={title} />
            </ListItem>
          </div>
          <div className="messages-list">
            {messages.length ? (
              <MessageList messages={messages} />
            ) : (
              <div>Empty chat.</div>
            )}
          </div>
          <div className="message-form">
            <MessageForm onSend={handleMessageSend} profile={nameProfile} />
          </div>
        </div>
      );
    case "loading":
      return <div className="loading">Loading...</div>;
    default:
      return <Error />;
  }
};
