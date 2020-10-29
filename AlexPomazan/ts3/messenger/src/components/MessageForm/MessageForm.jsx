import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import "./MessageForm.css";

export const MessageForm = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    text: "",
    author: "",
  });

  const handleInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value
    });
  };

  const handleMessageSend = () => {
    const { text, author } = dataForm;

    if (!text) {
      alert("Введите текст сообщения!");
      return;
    }
    if (!author) {
      alert("Введите имя автора!");
      return;
    }
    if (typeof onSend === "function") {
      onSend({ author, text });
      setDataForm({ ...dataForm, text: "" });
    }
  };

  const sendOnEnter = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) handleMessageSend();
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
}
