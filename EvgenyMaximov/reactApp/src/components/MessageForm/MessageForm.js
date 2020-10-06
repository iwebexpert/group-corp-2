import React from "react";
import Swal from "sweetalert2";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import "../../App.scss";

export class MessageForm extends React.Component {
  state = {
    text: "",
    author: "",
  };

  onInputChange = (event) => {
    const inputField = event.target.name;
    this.setState({ [inputField]: event.target.value });
  };

  sendMessage = () => {
    const { onSend } = this.props;
    const { text, author } = this.state;

    const textRegExp = /\S|(^\w$)/gi;

    if (!author) {
      Swal.fire({
        text: "Введите автора сообщения",
        icon: "error",
      });
      return;
    }

    if (!text || !textRegExp.test(text)) {
      Swal.fire({
        text: "Введите текст сообщения",
        icon: "error",
      });
      return;
    }

    if (typeof onSend === "function") {
      onSend(this.state);

      this.setState({ text: "" });
    }
  };

  keyDownHandler = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) this.sendMessage();
  };

  render() {
    const { text, author } = this.state;
    return (
      <div className={this.props.class}>
        <TextField
          label="Введите имя автора"
          name="author"
          type="text"
          value={author}
          onChange={this.onInputChange}
          autoFocus
        />
        <TextField
          label="Введите сообщение"
          name="text"
          value={text}
          onChange={this.onInputChange}
          onKeyDown={this.keyDownHandler}
          multiline
        />
        <Fab
          variant="round"
          color="primary"
          size="medium"
          onClick={this.sendMessage}
        >
          <Send />
        </Fab>
      </div>
    );
  }
}
