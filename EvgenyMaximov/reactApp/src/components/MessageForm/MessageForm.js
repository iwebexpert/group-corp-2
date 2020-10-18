import React, { useState } from "react";
import Swal from "sweetalert2";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import "../../App.scss";

export const MessageForm = ({ onSend, classform, isPending }) => {
  const [formData, setFormData] = useState({
    text: "",
    author: "",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    const { text, author } = formData;

    const textRegExp = /\S|(^\w$)/gi;

    if (!author) {
      Swal.fire({
        text: "Введите автора сообщения",
        icon: "error",
      });
      return;
    }

    if (author === "Бот") {
      Swal.fire({
        text: "Недопустимое имя пользователя",
        icon: "error",
      });
      return;
    }

    if (!text || !textRegExp.test(text)) {
      Swal.fire({
        text: "Введите текст сообщения",
        icon: "error",
      });
      return;
    }

    if (typeof onSend === "function") {
      onSend(formData);

      setFormData({ ...formData, text: "" });
    }
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) sendMessage();
  };

  return (
    <div className={classform}>
      <TextField
        label="Введите имя автора"
        name="author"
        type="text"
        value={formData.author}
        onChange={onInputChange}
        autoFocus
      />
      <TextField
        label="Введите сообщение"
        name="text"
        value={formData.text}
        onChange={onInputChange}
        onKeyDown={keyDownHandler}
        multiline
      />
      <Fab variant="round" color="primary" size="medium" onClick={sendMessage}>
        <Send />
      </Fab>
      {isPending ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};
