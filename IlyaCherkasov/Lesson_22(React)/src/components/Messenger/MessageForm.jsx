import React from 'react';
import { TextField, Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';

export default function MessageForm(props) {
  return (
    <div className="Messanger__form" onKeyDown={props.handleKeyDown}>
      <TextField
        label="Как вас зовут?"
        type="text"
        value={props.author}
        onChange={props.setAuthor}
        name="author"
      />
      <TextField
        label="Введите сообщение"
        name="text"
        value={props.text}
        onChange={props.setText}
        multiline
      />
      <Fab variant="round" color="primary" onClick={props.sendMessage}>
        <Send />
      </Fab>
      {/* <Button onClick={props.sendMessage}>
        нажми на меня или Ctrl + Enter чтобы отправить сообщение
      </Button> */}
    </div>
  );
}
