import React from "react";
import { Grid, TextField, Fab, makeStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { MesageType } from "../Message/Message";
import { useFormField } from "../../hooks/useFormField";

const useStyles = makeStyles({
  form: {
    margin: "20px",
  },
  button: {
    marginLeft: "20px",
    backgroundColor: "rgb(28, 184, 65)",
    "&:hover": {
      background: "#228B22",
    },
  },
});

type MessageFormType = {
  onSend: (message: MesageType) => void;
};


export const MessageForm: React.FC<MessageFormType> = ({ onSend }) => {
  const authorField = useFormField();
  const textField = useFormField();
  const errorText = useFormField();

  const handleMessageSend = (): void => {
    const author: string = authorField.value;
    const text: string = textField.value;

    if (!text || !author) {
      errorText.setValue("Вы забыли ввести своё имя или сообщение");
      return;
    } else {
      errorText.clearValue();
    };

    onSend({ author, text });
    textField.clearValue();
    authorField.clearValue();

  };

  const handleEnterDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (e.ctrlKey && e.keyCode === 13) {
      handleMessageSend();
    };
  };

  const classes = useStyles();

  return (
    
    <Grid container justify="space-around" className={classes.form}>
      <Grid item xs={5}>
        <TextField
          label="Введите своё имя"
          name="author"
          type="text"
          {...authorField}
          helperText={errorText.value}
          error={!!errorText.value}
          fullWidth
        />
      </Grid>

      <Grid item xs={5}>
        <TextField
          label="Введите сообщение"
          name="text"
          {...textField}
          onKeyDown={handleEnterDown}
          error={!!errorText.value}
          fullWidth
          multiline
          autoFocus
        />
      </Grid>
      <Grid item xs={2}>
        <Fab
          variant="round"
          color="primary"
          onClick={handleMessageSend}
          className={classes.button}
        >
          <Send />
        </Fab>
      </Grid>
    </Grid>
  );
};
