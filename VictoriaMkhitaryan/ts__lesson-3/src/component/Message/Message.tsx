import React from 'react';
import { NewMessageType } from '../../types/types';
import './Message.css';

export const Message: React.FC<NewMessageType> = ({message, author}) => {
  return <div>{message} - <b>{author}</b></div>;
}
