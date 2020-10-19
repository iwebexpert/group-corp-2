import React from "react";
import { Message } from "../Message";

export const MessageList = ({ messages }) => {
  return messages.map((message) => <Message {...message} key={message.id} />);
};
