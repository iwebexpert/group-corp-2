import React from 'react';
import './Message.css';

export default function Message({text, author}) {
  return <div>{text} - <b>{author}</b></div>;
}