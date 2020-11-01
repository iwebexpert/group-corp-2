import React, { useState } from "react";
import { TextField, Fab, withStyles, makeStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { MessageType } from "../Message/Message";
import { useFormField } from "../../hooks/useFromField";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0 auto",
    marginTop: "15px",
    width: "90%",
  },
  btn: {
    backgroundColor: "red",
  },
  label: {
    fontSize: "26",
    fontFamily: "Courier Prime",
  },
});

type MessageFormType = {
  onSend: (message: MessageType) => void;
  profile: string;
};

export const MessageForm: React.FC<MessageFormType> = ({ onSend, profile }) => {
  const textField = useFormField();

  const isEmpty = (str: string): boolean => {
    return !str || /^\s*$/.test(str);
  };

  const handleMessageSend = (): void => {
    const author: string = profile;
    const text: string = textField.value;

    if (isEmpty(text)) {
      alert("Empty input field!");
      return;
    }

    if (typeof onSend === "function") {
      onSend({ author, text });
      textField.clearValue();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      handleMessageSend();
      textField.clearValue();
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        label="Enter text..."
        name="text"
        value={textField.value}
        onChange={textField.onChange}
        onKeyDown={handleKeyDown}
        InputLabelProps={{
          style: { fontSize: 13, fontFamily: "Courier Prime" },
        }}
        multiline
        fullWidth
      />
      <Fab variant="round" onClick={handleMessageSend} className={classes.btn}>
        <Send />
      </Fab>
    </div>
  );
};
