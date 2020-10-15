import React, { useState } from 'react';
import './ChatForm.css';

import TextInput from '../TextInput/TextInput';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

export default function ChartForm(props) {
  const [chatInput, setChatInput] = useState('');

  const handleOnInputChat = (e) => {
    setChatInput(e.target.value);
  };

  const onClickAddChat = () => {
    const { handleCreateChat } = props;

    if(!chatInput || /^\s*$/.test(chatInput)){
      alert('Введите название чата');
      return;
    }

    if(typeof handleCreateChat === 'function'){
      handleCreateChat(chatInput);

      setChatInput('');
    }
  };

  return(
    <>
      <TextInput modifiers="chart-form__text-input"
                  label="Введите название чата"
                  type="text"
                  value={chatInput}
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