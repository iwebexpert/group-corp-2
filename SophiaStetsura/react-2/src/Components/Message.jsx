import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  get time() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
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
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }),
};