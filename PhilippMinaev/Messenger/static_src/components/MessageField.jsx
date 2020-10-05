import React from "react";
import PropTypes from "prop-types";
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

  static propTypes = {
    chatId: PropTypes.number.isRequired,
  };

  state = {
    chats: {
      1: { title: "Виталя", messageList: [1] },
      2: { title: "Ахмед", messageList: [2] },
      3: { title: "Софа", messageList: [] },
    },
    messages: {
      1: { text: "Привет!", sender: "bot" },
      2: { text: "Здравствуйте!", sender: "bot" },
    },
    input: "",
  };

  handleClick = (message) => {
    this.sendMessage(message);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Enter
      this.handleSendMessage(this.state.input, "me");
    }
  };

  handleSendMessage = (message, sender) => {
    const { messages, chats, input } = this.state;
    const { chatId } = this.props;

    if (input.length > 0 || sender === "bot") {
      const messageId = Object.keys(messages).length + 1;
      this.setState({
        messages: {
          ...messages,
          [messageId]: { text: message, sender: sender },
        },
        chats: {
          ...chats,
          [chatId]: {
            ...chats[chatId],
            messageList: [...chats[chatId]["messageList"], messageId],
          },
        },
      });
    }
    if (sender === "me") {
      this.setState({ input: "" });
    }
  };

  componentDidMount() {
    this.textInput.current.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;
    if (
      Object.keys(prevState.messages).length < Object.keys(messages).length &&
      Object.values(messages)[Object.values(messages).length - 1].sender ===
        "me"
    ) {
      setTimeout(
        () => this.handleSendMessage("Не приставай ко мне, я робот!", "bot"),
        1000
      );
    }
  }

  render() {
    const { messages, chats } = this.state;
    const { chatId } = this.props;

    const messageElements = chats[
      chatId
    ].messageList.map((messageId, index) => (
      <Message
        key={index}
        text={messages[messageId].text}
        sender={messages[messageId].sender}
      />
    ));

    return (
      <div className="messages">
        <div key="messageElements" className="message-field">
          {messageElements}
        </div>
        <div key="textInput" className="input-panel">
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
            onClick={() => this.handleSendMessage(this.state.input, "me")}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
}
