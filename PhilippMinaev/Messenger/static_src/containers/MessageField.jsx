import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Message from "./Message";
import "../styles/style.css";

class MessageField extends React.Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    messages: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  state = {
    input: "",
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
    if (this.state.input.length > 0 || sender === "bot") {
      this.props.sendMessage(message, sender);
    }
    if (sender === "me") {
      this.setState({ input: "" });
    }
  };

  render() {
    const { chatId, messages, chats } = this.props;

    const messageElements = chats[chatId].messageList.map((messageId) => (
      <Message
        key={messageId}
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

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
