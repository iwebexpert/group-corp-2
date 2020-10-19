import React, { Component } from "react";
import { List } from "@material-ui/core";

import { ChatItem } from "../ChatItem";
import { ChatForm } from "../ChatForm";
import { Error } from "../../pages/Error";

import "./ChatsList.css";

export const ChatsList = ({ loadStatus, chats, fireChats, onAdd, onClick }) => {
  const handleChatAdd = (newchat) => {
    if (newchat) {
      if (typeof onAdd === "function") {
        onAdd(newchat);
      }
    }
  };

  switch (loadStatus) {
    case "loaded":
      return (
        <div className="chats">
          <div className="chatsList">
            <List>
              {chats.map((chat) => (
                <ChatItem
                  avatar={chat.avatar}
                  title={chat.title}
                  id={chat.id}
                  title={chat.title}
                  fire={fireChats[chat.id]}
                  onClick={onClick}
                  key={chat.id}
                />
              ))}
            </List>
          </div>
          <ChatForm onSend={handleChatAdd} />
        </div>
      );
    case "loading":
      return <div className="loading">Loading...</div>;
    default:
      return <Error />;
  }
};
