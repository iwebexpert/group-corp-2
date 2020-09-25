import React, {Component} from 'react';
import PropTypes from 'prop-types';

export const messageType = {
  text: PropTypes.string.isRequired,
};
export const Message = ({text, author}) => {
  return <div>{text} - <b>{author}</b></div>;
};

Message.propTypes = messageType;