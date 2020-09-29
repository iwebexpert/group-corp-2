import React, {Component} from 'react';
import {Button, TextField, Fab} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import './messageForm.scss';

export class MessageForm extends Component {
  state = {
    text: '',
    author: '',
    time: '',
  };

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({[fieldName]: event.target.value});
  };

  handleMessageSend = () => {
    const {onSend} = this.props;
    const {text, author, time} = this.state;
    if (!author) {
      alert("Как вас зовут?");
      return;
    }
    if (!text) {
      alert("Введите сообщение");
      return;
    }
    if (typeof onSend === 'function') {
      onSend(this.state);
      this.setState({text: ''});
    }
  };

  getTimeFormat = () => {
    const time = new Date;
    const hours = time.getHours() < 10 ? '0' + +time.getHours() :  time.getHours();
    const minutes = time.getMinutes() < 10 ? '0' + +time.getMinutes() :  time.getMinutes();
    return `${hours}:${minutes}`;
  }

  handleKeyDownEnter = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.handleMessageSend();
    }
  }

  render() {
    const {text, author, time} = this.state;
    return (
      <div>
        <hr/>
        <div className="sendMessageBlock">
          <div className="sendPhotoVoice">
            <AttachFileIcon className="clip"/>
            <KeyboardVoiceIcon className="voice"/>
            <textarea placeholder="Type Message..." name="text" onChange={this.handleInputChange} onKeyDown={this.handleKeyDownEnter} value={text} type="text" className="mainSender"/>
          </div>
          <textarea placeholder="Type Author..." name="author" onChange={this.handleInputChange} onKeyDown={this.handleKeyDownEnter} value={author} type="text" className="mainSenderAuthor"/>
          <SendIcon onClick={this.handleMessageSend} className="sendIcon"/>
        </div>
      </div>
    );
  }
}

