import React, { Component } from 'react';
import './MessageForm.css';

import Button from '../Button/Button';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

export default class MessageForm extends Component {
  state = {
    message: '',
    author: '',
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
        handleMessageSend(this.state);

          this.setState({message: ''});
      }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') this.handleMessageSend();
  };
  
  render() {
    const {message, author} = this.state;
    console.log(message);

    return(
      <>
        <div>
          <input className="chat__input" 
                  name="author" 
                  type="text" 
                  onChange={this.handleInputChange} 
                  placeholder="Введите имя автора" 
                  value={author} />
        </div>
        <div>
          <textarea className="chat__input" 
                    onKeyDown={() => {}} 
                    name="message" 
                    onChange={this.handleInputChange} 
                    onKeyDown={this.handleKeyDown}
                    placeholder="Введите текст сообщения" 
                    value={message} />
        </div>
        <div>
          <IconButton
                className="chat__icon-button"
                size="medium"
                onClick={this.handleMessageSend} >
            <SendIcon />
          </IconButton>
        </div>
      </>
    );
  }
}