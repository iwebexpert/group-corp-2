import React, { useState } from 'react';
import './MessageForm.css';

import TextInput from '../TextInput/TextInput';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import { useFormField } from '../../hooks/useFormField';

export const MessageForm = ({onMessageSend, author}) => {

  const authorField = useFormField();
  const textField = useFormField();

  // const handleInputChange = (e) => {
  //   const fieldName = e.target.name;
  //   this.setState({[fieldName]: e.target.value}); 
  // };

  const handleMessageSend = () => {
      // const {handleMessageSend} = this.props;
      // const {message} = this.state;
      const text = textField.value;

      if(!text || /^\s*$/.test(text)){
          alert('Введите текст сообщения');
          return;
      }

      if(typeof onMessageSend === 'function'){
        onMessageSend({message: text, author});

        textField.clearValue();
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessageSend();
    }
  };

  // const {message} = this.state;
  return(
    <>
      <TextInput modifiers="message-form__message"
                  label="Введите текст сообщения"
                  name="message"
                  value={textField.value}
                  onChange={textField.onChange}
                  onKeyDown={handleKeyDown}
                  multiline />
      <IconButton className="chat__icon-button"
                  size="medium"
                  onClick={handleMessageSend} >
        <SendIcon />
      </IconButton>
    </>
  );
}
