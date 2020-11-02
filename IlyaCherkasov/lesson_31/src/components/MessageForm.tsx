import React, { memo } from 'react';

import url from '../img/sandButtn.png';

import { MessageFormComponentType } from '../types'

const MessageForm: React.FC<MessageFormComponentType> = memo((props) => {

  const handleChangeSetText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.setText) {
      props.setText(e.target.value);
    }
  }

  return (
    <div className={props.classN} onKeyDown={props.handleKeyDown}>
      <input
        name="text"
        value={props.text}
        onChange={handleChangeSetText}
        placeholder="Введите сообщение"
      />
      <img src={url} alt="Отправить" onClick={props.handleSetMessage} />
    </div>
  );
});

export default MessageForm;
