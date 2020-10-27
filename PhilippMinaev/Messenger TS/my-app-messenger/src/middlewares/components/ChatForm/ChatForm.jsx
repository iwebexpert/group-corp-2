import React, { useCallback, useState } from "react";
import { IconButton, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./ChatForm.css";

import { chatListFormData } from "../../hooks/chatListFormData";

const useStyles = makeStyles({
  root: {
    color: "red",
    fontFamily: "Courier Prime",
  },
  multilineColor: {
    color: "white",
  },
});

export const ChatForm = ({ onSend }) => {
  const nameChat = chatListFormData();

  const classes = useStyles();

  const isEmpty = (str) => {
    return !str || /^\s*$/.test(str);
  };

  const handleChatSend = () => {
    if (isEmpty(nameChat)) {
      alert("Enter chat name!");
      return;
    }

    if (typeof onSend === "function") {
      onSend(nameChat.value);
      nameChat.clearValue();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChatSend();
    }
  };

  return (
    <div className="btnAddChat">
      <TextField
        label="Enter chat name..."
        name="nameChat"
        value={nameChat.value}
        onChange={nameChat.onChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          classes: {
            input: classes.multilineColor,
          },
        }}
        multiline
        fullWidth
        inputProps={{ maxLength: 15 }}
      />

      <IconButton
        aria-label="add"
        className={classes.root}
        onClick={handleChatSend}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};
