import React, { useState } from "react";
import {
  Grid,
  TextField,
  Fab,
  Theme,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

type MessageFormType = {
  onSend: (message: MessageType) => void;
};

export const MessageForm: React.FC<MessageFormType> = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    text: "",
    author: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageSend = (): void => {
    const { text, author } = dataForm;

    if (!text || !author) {
      alert("Введите имя и сообщение");
    } else {
      onSend({ author, text });
      setDataForm({ ...dataForm, text: "", author: "" });
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.keyCode === 13 && e.ctrlKey) {
      handleMessageSend();
    }
  };

  const theme = useTheme<Theme>();
  const classes = useStyles(theme);

  return (
    <Grid container justify="space-around" className={classes.form}>
      <Grid item xs={5}>
        <TextField
          label="Введите своё имя"
          name="author"
          type="text"
          value={dataForm.author}
          onChange={handleChange}
          onKeyDown={handleEnter}
          fullWidth
        />
      </Grid>

      <Grid item xs={5}>
        <TextField
          label="Введите сообщение"
          name="text"
          value={dataForm.text}
          onChange={handleChange}
          onKeyDown={handleEnter}
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
