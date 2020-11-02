import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import "./ChatForm.css";

type ChatFormType = {
  onSend: (chat: ChatNewType) => void;
};

export const ChatForm: React.FC<ChatFormType> = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    title: "",
  });

  const onChangeInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitForm = (): void => {
    const { title } = dataForm;

    if (!title) {
      alert("Введите название чата");
      return;
    }
    onSend({ title });
    setDataForm({ ...dataForm, title: "" });
  };
  const keydownHandler = (event: React.KeyboardEvent<HTMLDivElement>): void => {
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
  );
};
