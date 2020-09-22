import React, { Component } from "react";
import ReactDOM from "react-dom";
import Message from "./components/Message";
import MessagesList from "./components/MessagesList";
import "./index.css";
import rocket from "./components/rocket.png";

const messages = [{ message: "Привет!" }, { message: "Как дела?" }];

class Chat extends React.Component {
  state = {
    messages: messages,
    inputText: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const nextMessages = [
      ...this.state.messages,
      { message: this.state.inputText },
    ];

    const nextInputText = "";
    this.setState({ messages: nextMessages, inputText: nextInputText });
  };

  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
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
              onChange={this.handleChange}
              value={this.state.inputText}
              className="input"
              placeholder="Напишите сообщение"
            />
            <button className="button">Отправить</button>
          </form>
        </div>
      </>
    );
  };
};

ReactDOM.render(<Chat />, document.getElementById("root"));
