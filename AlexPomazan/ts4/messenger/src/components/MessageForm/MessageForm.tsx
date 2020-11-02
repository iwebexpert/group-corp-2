import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import "./MessageForm.css";

type MessageFormType = {
  onSend: (message: MessageType) => void;
};

export const MessageForm: React.FC<MessageFormType> = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    text: "",
    author: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleMessageSend = (): void => {
    const { text, author } = dataForm;

    if (!text || text.trim().length === 0) {
      alert("Введите текст сообщения");
      return;
    }
    if (!author) {
      alert("Введите автора сообщения!");
      return;
    }
    onSend({ author, text });
    setDataForm({ ...dataForm, text: "" });
  };

  const sendOnEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.keyCode === 13 && event.ctrlKey) {
      handleMessageSend();
    }
  };

  const { text, author } = dataForm;

  return (
    <>
      <div className="message-form">
        <TextField
          className="message-form__input"
          name="author"
          type="text"
          onChange={handleInputChange}
          onKeyDown={sendOnEnter}
          placeholder="Введите имя автора"
          value={author}
        />
        <TextField
          className="message-form__textarea"
          name="text"
          onChange={handleInputChange}
          onKeyDown={sendOnEnter}
          placeholder="Введите текст сообщения"
          value={text}
          multiline
          autoFocus
        />
        <Fab
          variant="round"
          color="primary"
          className="message-form__btn btn btn-success"
          onClick={handleMessageSend}
        >
          <Send />
        </Fab>
      </div>
    </>
  );
};
