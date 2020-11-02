import React from "react";
import { Message } from "../Message";
import { MessagePayload } from "../../actions/chats";

type MessageListType = {
  messages: Array<MessagePayload>;
};

export const MessageList: React.FC<MessageListType> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <Message {...message} key={message.id} />
      ))}
    </div>
  );
};
