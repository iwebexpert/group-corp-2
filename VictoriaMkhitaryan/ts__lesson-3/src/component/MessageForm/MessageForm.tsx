import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './MessageForm.css';

import TextInput from '../TextInput/TextInput';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import { useFormField } from '../../hooks/useFormField';
import { MessageType } from '../../types/types';
import { ReactReduxContextValue } from 'react-redux';

type MessageFormType = {
  author: string;
  onMessageSend: (message: MessageType) => void;
};

export const MessageForm: React.FC<MessageFormType> = ({ onMessageSend, author }) => {

  const authorField = useFormField();
  const textField = useFormField();

  const handleMessageSend = () => {
      const text: string = textField.value;

      if(!text || /^\s*$/.test(text)){
          alert('Введите текст сообщения');
          return;
      }

      if(typeof onMessageSend === 'function'){
        const id = nanoid();
        onMessageSend({message: text, author, id, chatId: 0});

        textField.clearValue();
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
