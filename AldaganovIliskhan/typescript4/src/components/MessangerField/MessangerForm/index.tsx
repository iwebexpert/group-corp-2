import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { Fab } from "@material-ui/core";

import { ChatsType, sendMessageAction } from "../../../actions/chats";
import "./MessangerForm.scss";
type MessangerForm = {
  activeChat: ChatsType;
};
export const MessangerForm: React.FC<MessangerForm> = ({ activeChat }) => {
  const [author, setAuthor] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const diopatch = useDispatch();
  const onAdd = (message: string) => {
    if (!message) {
      alert("Введите сообщение");
      return;
    }
    if (!author) {
      alert("Введите имя");
      return;
    }
    diopatch(sendMessageAction(activeChat.id, author, message));
    setAuthor("");
    setMessage("");
  };

  const onKeyDownEnter = (
    e: React.KeyboardEvent<HTMLDivElement>,
    message: string
  ) => {
    if (e.ctrlKey && e.key === "Enter") {
      onAdd(message);
    }
  };
  return (
    <div className="messanger__form" style={{ textAlign: "center" }}>
      <TextField
        label="Введите имя"
        style={{ marginRight: "10px" }}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        onKeyDown={(e) => onKeyDownEnter(e, message)}
      />
      <TextField
        label="Введите сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => onKeyDownEnter(e, message)}
      />
      <Fab variant="round" color="primary" onClick={() => onAdd(message)}>
        <Send />
      </Fab>
    </div>
  );
};
