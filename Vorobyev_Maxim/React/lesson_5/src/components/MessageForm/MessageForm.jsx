import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Fab, withStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import './messageForm.scss';
import SendIcon from '@material-ui/icons/Send';

class MessageFormClass extends Component {
  state = {
    text: '',
    author: '',
  };

  static propTypes = {
    onSend: PropTypes.func.isRequired,
  };

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({ [fieldName]: event.target.value });
  };

  handleMessageSend = () => {
    const { onSend } = this.props;
    const { text, author } = this.state;

    if (!text) {
      alert('Введите текст сообщения');
      return;
    }

    if (!author) {
      alert('Введите автора сообщения');
      return;
    }

    if (typeof onSend === 'function') {
      onSend(this.state);
      this.setState({ text: '' });
    }
  };

  handleEnterDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.handleMessageSend();
    }
  };

  render() {
    console.log(this.props);
    const { text, author } = this.state;
    return (
      <>
        <textarea placeholder="Type Message..." className="typeMesageTextArea" name="text" onChange={this.handleInputChange} onKeyDown={this.handleEnterDown} value={text}></textarea>
        <input placeholder="Type Author Name..." className="typeAuthorName" name="author" type="text" value={author} onChange={this.handleInputChange} onKeyDown={this.handleEnterDown} />
        <SendIcon className="sendMessageIcon" onClick={this.handleMessageSend} fontSize="large"/>
      </>
    );
  }
}

export const MessageForm = MessageFormClass;