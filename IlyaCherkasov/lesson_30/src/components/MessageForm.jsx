import React, { memo } from 'react';

import url from '../img/sandButtn.png';

const MessageForm = memo((props) => {
  return (
    <div className={props.classN} onKeyDown={props.handleKeyDown}>
      <input
        name="text"
        value={props.text}
        onChange={(e) => props.setText(e.target.value)}
        placeholder="Введите сообщение"
      />
      <img src={url} alt="Отправить" onClick={props.handleSetMessage} />
    </div>
  );
});

export default MessageForm;
