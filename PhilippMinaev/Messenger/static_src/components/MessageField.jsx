import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./Message";
import "../styles/style.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    messages: [
      { text: "Привет!", author: "Робот" },
      { text: "Как дела?", author: "Робот" },
    ],
    input: "",
  };

  handleClick = (message) => {
    this.sendMessage(message);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyUp = (event, message) => {
    if (event.keyCode === 13) {
      // Enter
      this.sendMessage(message);
    }
  };

  sendMessage = (message) => {
    if (message != "")
      this.setState({
        messages: [...this.state.messages, { text: message, author: "Я" }],
        input: "",
      });
  };

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    const messageElements = this.state.messages.map((message, index) => (
      <Message key={index} text={message.text} author={message.author} />
    ));

    return (
      <div className="messages">
        <div className="message-field">{messageElements}</div>
        <div className="input-panel">
          <TextField
            name="input"
            ref={this.textInput}
            fullWidth={true}
            hinttext="Введите сообщение"
            style={{ fontSize: "22px", marginRight: "20px" }}
            onChange={this.handleChange}
            value={this.state.input}
            onKeyUp={(event) => this.handleKeyUp(event, this.state.input)}
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={() => this.handleClick(this.state.input)}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    if (
      this.state.messages[this.state.messages.length - 1].author == "Я" &&
      this.state.input == ""
    ) {
      setTimeout(
        () =>
          this.setState({
            messages: [
              ...this.state.messages,
              { text: "Не приставай ко мне, я робот!", author: "Робот" },
            ],
          }),
        1000
      );
    }
  }
}
