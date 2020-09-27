import React from 'react';
import {Message, messageType} from './Message';
import PropTypes from 'prop-types';

export const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message text = { item.text } key = { index } author = {item.author}/>));
};

MessagesList.propTypes = {
  items: PropTypes.arrayOf(
      PropTypes.shape(messageType),
  ),
};