import React from "react";
import Message from "./Message";
import MessagesList from "./MessagesList";
import rocket from "./assets/rocket.png";
import "./css/Chat.css";


class Chat extends React.Component {
  state = {
    messages: [
      { message: "Привет!", author: "Руслан" },
      { message: "Как дела?", author: "Руслан" },
    ],
    inputText: "",
    inputAuthor: "",
    showError: false
  };

  componentDidMount() {
    document
      .querySelector(".input-author")
      .addEventListener("keydown", this.handleSend);
    document
      .querySelector(".input-text")
      .addEventListener("keydown", this.handleSend);
  };


  componentDidUpdate() {
    if (this.state.messages.length % 2 === 1) {
      setTimeout(
        () =>
          this.setState({
            messages: [
              ...this.state.messages,
              {
                message: "Не приставай ко мне, я робот!",
                author: "Робот",
              },
            ],
          }),
        1000
      );
    };
  };

  componentWillUnmount() {
    document
      .querySelector(".input-author")
      .removeEventListener("keydown", this.handleSend);
    document
      .querySelector(".input-text")
      .removeEventListener("keydown", this.handleSend);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.inputText) {
    const nextMessages = [
      ...this.state.messages,
      {
        message: this.state.inputText,
        author: this.state.inputAuthor,
      },
    ];

    const nextInputText = "";
    const nextInputAuthor = "";
    this.setState({
      messages: nextMessages,
      inputText: nextInputText,
      inputAuthor: nextInputText,
    });
    this.setState({ showError: false });
    } else {
    this.setState({ showError: !this.state.showError });
    };
  };

  handleChange = (e) => {
    const fieldName = e.target.name;
    this.setState({ [fieldName]: e.target.value });
  };

  handleSend = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.handleSubmit();
    };
  };

  render() {
    return (
      <>
        <div className="head">
          <img src={rocket} className="rocket" />
          <h1>Реактивный чат</h1>
        </div>

        <div className="chat">
          <MessagesList messages={this.state.messages} className="list" />
          <form onSubmit={this.handleSubmit} className="form">
            <input
              type="text"
              name="inputAuthor"
              onChange={this.handleChange}
              value={this.state.inputAuthor}
              className="input-author"
              placeholder="Напишите имя автора"
            />
            <input
              type="text"
              name="inputText"
              onChange={this.handleChange}
              value={this.state.inputText}
              className="input-text"
              placeholder="Напишите сообщение"
            />
            <button className="button" type="submit">Отправить</button>
            {this.state.showError && <p className="error">Ввведите имя и сообщение</p>}
          </form>
        </div>
      </>
    );
  };
};

export default Chat;
