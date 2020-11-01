import React from "react";
import { Message } from "../Message";

type MessagesListProps = {
  items: MessageType[];
};

export const MessagesList: React.FC<MessagesListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Message {...item} key={item.id} />
      ))}
    </div>
  );
};
