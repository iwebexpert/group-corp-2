import React, { Component } from "react";
import PropTypes from "prop-types";

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
          <input
            className="message-form__input"
            name="author"
            type="text"
            onChange={this.handleInputChange}
            onKeyDown={this.sendOnEnter}
            placeholder="Введите имя автора"
            value={author}
          />
          <textarea
            className="message-form__textarea"
            onKeyDown={() => {}}
            name="text"
            onChange={this.handleInputChange}
            onKeyDown={this.sendOnEnter}
            placeholder="Введите текст сообщения"
            value={text}
          />
          <button
            className="message-form__btn btn btn-success"
            onClick={this.handleMessageSend}
          >
            Отправить сообщение
          </button>
        </div>
      </>
    );
  }
}
