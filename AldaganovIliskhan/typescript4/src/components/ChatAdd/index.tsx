import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { addChatAction } from "../../actions/chats";

import { ChatsType } from "../../actions/chats";
import "./ChatAdd.scss";
type ChatAddType = {
  chats: ChatsType[];
};
export const ChatAdd: React.FC<ChatAddType> = ({ chats }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const onAdd = (inputValue: string) => {
    if (!inputValue) {
      alert("Введите название чата");
      return;
    }
    const newChat: ChatsType = {
      title: inputValue,
      messages: [],
      fire: false,
      id: chats.length === 0 ? 1 : chats[chats.length - 1].id + 1,
    };

    dispatch(addChatAction(newChat));
    setInputValue("");
  };
  const onKeyDownEnter = (
    e: React.KeyboardEvent<HTMLDivElement>,
    inputValue: string
  ) => {
    if (e.ctrlKey && e.key === "Enter") {
      onAdd(inputValue);
    }
  };
  return (
    <div className="chat_add">
      <TextField
        id="standard-basic"
        label="Введите название чата"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => onKeyDownEnter(e, inputValue)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAdd(inputValue)}
      >
        Добавить чат
      </Button>
    </div>
  );
};
