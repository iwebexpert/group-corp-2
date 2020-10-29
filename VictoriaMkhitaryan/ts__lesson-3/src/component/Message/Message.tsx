import React from 'react';
import './Message.css';

export type MessageType = {
  text: string;
  author: string;
}

export const Message: React.FC<MessageType> = ({text, author}) => {
  return <div>{text} - <b>{author}</b></div>;
}
