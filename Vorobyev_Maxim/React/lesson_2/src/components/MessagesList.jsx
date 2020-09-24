import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Message, messageType} from './Message';

export const MessagesList = (props) => {
  return props.items.map((item, index) => (<Message text={item.text} author={item.author} key={index}/>));
}; 

MessagesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(messageType),
  ),
};