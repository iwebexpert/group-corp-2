import React, { Component } from "react";
import { Grid, Button, TextField, Fab, withStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";

const styles = {
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
};

class MessageFormClass extends Component {
  state = {
    text: "",
    author: "",
    showError: false,
    errorText: "",
  };

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({ [fieldName]: event.target.value });
  };

  handleMessageSend = () => {
    const { onSend } = this.props;
    const { text, author } = this.state;

    if (!text || !author) {
      this.setState({ errorText: "Вы забыли ввести своё имя или сообщение" });
      return;
    } else {
      this.setState({ errorText: "" });
    };

    if (typeof onSend === "function") {
      onSend(this.state);

      this.setState({ text: "", author: "" });
    };
  };

  handleEnterDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.handleMessageSend();
    };
  };

  render() {
    const { text, author } = this.state;
    const { classes } = this.props;

    return (
      <Grid container justify="space-around" className={classes.form}>
        <Grid item xs={5}>
          <TextField
            label="Введите своё имя"
            name="author"
            type="text"
            value={author}
            onChange={this.handleInputChange}
            helperText={this.state.errorText}
            error={!!this.state.errorText}
            fullWidth
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="Введите сообщение"
            name="text"
            value={text}
            onChange={this.handleInputChange}
            onKeyDown={this.handleEnterDown}
            error={!!this.state.errorText}
            fullWidth
            multiline
            autoFocus
          />
        </Grid>
        <Grid item xs={2}>
          <Fab
            variant="round"
            color="primary"
            onClick={this.handleMessageSend}
            className={classes.button}
          >
            <Send />
          </Fab>
        </Grid>
      </Grid>
    );
  };
};

export const MessageForm = withStyles(styles)(MessageFormClass);
