import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import "./ChatForm.css";

export const ChatForm = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    title: ""
  });

  const onChangeInputHandler = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value
    });
  };

  const onSubmitForm = () => {
    const { title } = dataForm;

    if (!title) {
      alert("Укажите название чата!");
      return;
    }

    if (typeof onSend === "function") {
      onSend({ title });
      setDataForm({ ...dataForm, title: "" });
    }
  };

  const keydownHandler = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      onSubmitForm();
    }
  };

  return (
    <div className="add-chat">
      <TextField
        className="input-title"
        variant="outlined"
        label="Введите название чата"
        name="title"
        type="text"
        value={dataForm.title}
        onChange={onChangeInputHandler}
        onKeyDown={keydownHandler}
      />
      <Fab className="btn-add" variant="round" onClick={onSubmitForm}>
        <AddIcon />
      </Fab>
    </div>
  )
};
