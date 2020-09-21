import React from 'react';
import './MessagesList.css';

import Message from '../Message/Message';

export default function MessagesList(props) {
  console.log(props.messagesData);
  return props.messagesData.map((item, index) => (<Message text={item.message} author={item.author} key={index} />));
}