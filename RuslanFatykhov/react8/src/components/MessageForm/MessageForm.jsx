import React, { useState } from "react";
import { Grid, Button, TextField, Fab, makeStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";

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

export const MessageForm = ({ onSend }) => {
  const [dataForm, setDataForm] = useState({
    text: "",
    author: "",
  });

  const [showError, setshowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageSend = () => {
    const { text, author } = dataForm;

    if (!text || !author) {
      setErrorText({
        ...errorText,
        errorText: "Вы забыли ввести своё имя или сообщение",
      });
      return;
    } else {
      setErrorText({
        ...errorText,
        errorText: "",
      });
    };

    if (typeof onSend === "function") {
      onSend({ author, text });
      setDataForm({ ...dataForm, text: "", author: "" });
    };
  };

  const handleEnterDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      handleMessageSend();
    };
  };

  const { text, author } = dataForm;
  const classes = useStyles();

  return (
    <Grid container justify="space-around" className={classes.form}>
      <Grid item xs={5}>
        <TextField
          label="Введите своё имя"
          name="author"
          type="text"
          value={author}
          onChange={handleInputChange}
          helperText={errorText.errorText}
          error={!!errorText.errorText}
          fullWidth
        />
      </Grid>

      <Grid item xs={5}>
        <TextField
          label="Введите сообщение"
          name="text"
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleEnterDown}
          error={!!errorText.errorText}
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
