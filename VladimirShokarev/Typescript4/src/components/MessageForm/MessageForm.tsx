import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { profile } from "../../Helpers";

export type MessageFormType = {
  onSend: (message: MessageType) => void;
};

export const MessageForm: React.FC<MessageFormType> = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    text: "",
    author: `${profile.nickname}`,
  });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleMessageSend = (): void => {
    const { text, author } = dataForm;

    if (!text || text.trim().length == 0) {
      alert("Введите текст сообщения");
      return;
    };
    if (!author) {
      alert("Введите автора сообщения!");
      return;
    };
    if (typeof onSend === "function") {
      onSend({ author, text });
      setDataForm({ ...dataForm, text: "" });
    };
  };

  const keydownHandler = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.keyCode === 13 && event.ctrlKey) {
      handleMessageSend();
    };
  };

  return (
    <div className="send-window">
      <TextField
        label="Введите имя автора"
        name="author"
        type="text"
        value={dataForm.author}
        onChange={handleInputChange}
        onKeyDown={keydownHandler}
      />
      <TextField
        label="Введите текст сообщения"
        name="text"
        value={dataForm.text}
        onChange={handleInputChange}
        onKeyDown={keydownHandler}
        multiline
        autoFocus
      />
      <Fab variant="round" color="primary" onClick={handleMessageSend}>
        <Send />
      </Fab>
    </div>
  );
};

MessageForm.propTypes = {
  onSend: PropTypes.func.isRequired,
};
