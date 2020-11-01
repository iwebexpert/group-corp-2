import React, { Component } from "react";
import { List } from "@material-ui/core";

import { ChatItem } from "../ChatItem";
import { ChatForm } from "../ChatForm";
import { Error } from "../../pages/Error";
import { ChatPayload } from "../../actions/chats";
import "./ChatsList.css";

type ChatItemType = {
  onClick: (id: number) => void;
  loadStatus: string | null;
  onAdd: (newchat: string) => void;
  chats: Array<ChatPayload>;
  fireChats: Array<boolean>;
};
export const ChatsList: React.FC<ChatItemType> = ({
  loadStatus,
  chats,
  fireChats,
  onAdd,
  onClick,
}) => {
  const handleChatAdd = (newchat: string): void => {
    if (newchat) {
      onAdd(newchat);
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
