import React, { Component } from "react";
import { List } from "@material-ui/core";

import { ChatItem } from "../ChatItem";
import { ChatForm } from "../ChatForm";
import { Error } from "../../pages/Error";

import "./ChatsList.css";

export class ChatsList extends Component {
  handleChatAdd = (newchat) => {
    const { onAdd } = this.props;
    if (newchat) {
      if (typeof onAdd === "function") {
        onAdd(newchat);
      }
    }
  };
  render() {
    const { loadStatus, chats, fireChats, onClick } = this.props;
    return loadStatus ? (
      <div className="chats">
        <div className="chatsList">
          <List>
            {loadStatus == "loaded" ? (
              chats.map((chat) => (
                <ChatItem
                  avatar={chat.avatar}
                  title={chat.title}
                  id={chat.id}
                  title={chat.title}
                  fire={fireChats[chat.id]}
                  onClick={onClick}
                  key={chat.id}
                />
              ))
            ) : (
              <div className="loading">Loading...</div>
            )}
          </List>
        </div>
        <ChatForm onSend={this.handleChatAdd} />
      </div>
    ) : (
      <Error />
    );
  }
}
