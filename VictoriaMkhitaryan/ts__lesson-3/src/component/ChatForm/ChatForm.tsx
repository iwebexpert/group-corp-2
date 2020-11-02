import React, { useState } from 'react';
import './ChatForm.css';

import { TextInput } from '../TextInput/TextInput';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { NewChatType } from '../../types/types';

type ChatFormType = {
  handleCreateChat: (title: NewChatType) => void;
};

export const ChatForm: React.FC<ChatFormType> = ({ handleCreateChat }) => {
  // ошибка: Аргумент типа "string" нельзя назначить параметру типа "NewChatType | (() => NewChatType)".
  // не понимаю как исправить
  // type NewChatType = {
  //   title: string;
  // };

  const [title, setChatInput] = useState<NewChatType | any>('');

  const handleOnInputChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const onClickAddChat = () => {
    if(!title){
      alert('Введите название чата');
      return;
    }

    if(typeof handleCreateChat === 'function'){
      handleCreateChat(title);

      setChatInput('');
    }
  };

  return(
    <>
      <TextInput modifiers="chart-form__text-input"
                  label="Введите название чата"
                  // type="text"
                  value={title}
                  onChange={handleOnInputChat} />
      <IconButton
                className="chat__icon-button"
                size="medium"
                onClick={onClickAddChat} 
                >
        <AddIcon />
      </IconButton>
    </>
  );
}