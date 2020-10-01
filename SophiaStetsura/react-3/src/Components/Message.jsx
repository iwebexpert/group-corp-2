import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message } = this.props;
    const classname = `message ${message.sender === 'me' ? 'message-me' : ''}`;
    return (
      <div className={classname}>
        <div className="message__author">{message.sender}</div>
        <div>{message.text}</div>
        <div className="message__time">{this.time}</div>
      </div>
    );
  }
}

Message.propTypes = {
  // eslint-disable-next-line react/require-default-props
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }),
};