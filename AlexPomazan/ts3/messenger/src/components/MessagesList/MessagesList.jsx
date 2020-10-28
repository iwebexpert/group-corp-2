import React from "react";
import { Message } from "../Message";
import "./MessagesList.css";

export const MessagesList = (props) => {
  const { items } = props;
  return (
    <div className="messages-list">
      {items.map((item) => (
        <Message {...item} key={item.id} />
      ))}
    </div>
  );
}