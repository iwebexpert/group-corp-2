import React, {Component} from 'react';
import {Message, messageType} from '../Message';

export const MessagesList = (props) => {
  return props.items.map((item, index) => (<Message {...item} key={index}/>));
}; 
