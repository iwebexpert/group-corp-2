import React, { memo } from 'react';
import { TextField, Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';

const MessageForm = memo((props) => {
  return (
    <div className="Messanger__form" onKeyDown={props.handleKeyDown}>
      <TextField
        label="Как вас зовут?"
        type="text"
        value={props.author}
        onChange={(e) => props.setAuthor(e.target.value)}
        name="author"
      />
      <TextField
        label="Введите сообщение"
        name="text"
        value={props.text}
        onChange={(e) => props.setText(e.target.value)}
        multiline
      />
      <Fab variant="round" color="primary" onClick={props.sendMessage}>
        <Send />
      </Fab>
    </div>
  );
});

export default MessageForm;
