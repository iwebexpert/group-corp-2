import React, { Component } from 'react';
import './MessageForm.css';

import TextInput from '../TextInput/TextInput';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

export default class MessageForm extends Component {
  state = {
    message: '',
  };

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({[fieldName]: event.target.value}); 
  };

  handleMessageSend = () => {
      const {handleMessageSend} = this.props;
      const {message} = this.state;

      if(!message || /^\s*$/.test(message)){
          alert('Введите текст сообщения');
          return;
      }

      if(typeof handleMessageSend === 'function'){
        handleMessageSend({message: this.state.message, author: this.props.author});

          this.setState({message: ''});
      }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleMessageSend();
    }
  };
  
  render() {
    const {message} = this.state;
    return(
      <>
          <TextInput modifiers="message-form__message"
                      label="Введите текст сообщения"
                      name="message"
                      value={message}
                      onChange={this.handleInputChange}
                      onKeyDown={this.handleKeyDown}
                      multiline />
          <IconButton
                className="chat__icon-button"
                size="medium"
                onClick={this.handleMessageSend} >
            <SendIcon />
          </IconButton>
      </>
    );
  }
}