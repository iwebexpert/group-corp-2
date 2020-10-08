import React, { Component } from "react";
import PropTypes from "prop-types";

import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import "./MessageForm.css";

export class MessageForm extends Component {
  state = {
    text: "",
    author: "",
  };

  static propTypes = {
    onSend: PropTypes.func.isRequired,
  };

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({ [fieldName]: event.target.value });
  };

  handleMessageSend = () => {
    const { onSend } = this.props;
    const { text } = this.state;
    const { author } = this.state;

    if (!text) {
      alert("Введите текст сообщения!");
      return;
    }
    if (!author) {
      alert("Введите имя автора!");
      return;
    }
    if (typeof onSend === "function") {
      onSend(this.state);

      this.setState({ text: "" });
    }
  };

  sendOnEnter = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) this.handleMessageSend();
  };

  render() {
    const { text, author } = this.state;

    return (
      <>
        <div className="message-form">
          <TextField
            className="message-form__input"
            name="author"
            type="text"
            onChange={this.handleInputChange}
            onKeyDown={this.sendOnEnter}
            placeholder="Введите имя автора"
            value={author}
          />
          <TextField
            className="message-form__textarea"
            name="text"
            onChange={this.handleInputChange}
            onKeyDown={this.sendOnEnter}
            placeholder="Введите текст сообщения"
            value={text}
            multiline
            autoFocus
          />
          <Fab
            variant="round"
            color="primary"
            className="message-form__btn btn btn-success"
            onClick={this.handleMessageSend}
          >
            <Send />
          </Fab>
        </div>
      </>
    );
  }
}
