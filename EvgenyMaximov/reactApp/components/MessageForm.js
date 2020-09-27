import React from "react";

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

    if (!text) {
      alert("Введите текст");
      return;
    }
    if (!author) {
      alert("Введите имя автора");
      return;
    }
    if (typeof onSend === "function") {
      onSend(this.state);

      this.setState({ text: "", author: "" });
    }
  };

  keyDownHandler = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) this.sendMessage();
  };

  render() {
    const { text, author } = this.state;
    return (
      <>
        <div>
          <textarea
            name="text"
            onChange={this.onInputChange}
            placeholder="Введите текст"
            value={text}
            onKeyDown={this.keyDownHandler}
          ></textarea>
        </div>
        <div>
          <input
            onChange={this.onInputChange}
            type="text"
            name="author"
            placeholder="Введите имя автора"
            value={author}
            onKeyDown={this.keyDownHandler}
          />
        </div>
        <div>
          <button onClick={this.sendMessage}>Отправить</button>
        </div>
      </>
    );
  }
}
