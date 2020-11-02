import React from "react";
import { Message } from "../Message";
import "./MessagesList.css";

type MessagesListProps = {
  items: Array<MessageType>;
};

export const MessagesList: React.FC<MessagesListProps> = (props) => {
  const { items } = props;
  return (
    <div className="messages-list">
      {items.map((item) => (
        <Message {...item} key={item.id} />
      ))}
    </div>
  );
};
