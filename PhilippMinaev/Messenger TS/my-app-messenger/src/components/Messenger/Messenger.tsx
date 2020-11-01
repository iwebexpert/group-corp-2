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
import { MessageType } from "../Message/Message";
import { MessagePayload } from "../../actions/chats";

type MessengerType = {
  onAdd: (message: MessageType) => void;
  title: string;
  nameProfile: string;
  avatarChat: string;
  messages: Array<MessagePayload>;
  loadStatus: string | null;
};

export const Messenger: React.FC<MessengerType> = ({
  title,
  nameProfile,
  avatarChat,
  messages,
  loadStatus,
  onAdd,
}) => {
  const handleMessageSend = (message: MessageType) => {
    onAdd(message);
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
