import React from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import ChatList from "./ChatList";
import Header from "./Header";
import MessageField from "./MessageField";
import PropTypes from "prop-types";
import { sendMessage } from "../actions/messageActions";
import "../styles/style.css";

class Layout extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
    sendMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chatId: 1,
  };

  state = {
    messages: {
      1: { text: "Привет!", sender: "bot" },
      2: { text: "Здравствуйте!", sender: "bot" },
    },
  };

  sendMessage = (message, sender) => {
    const { messages } = this.state;
    const { chatId } = this.props;

    const messageId = Object.keys(messages).length + 1;
    this.setState({
      messages: { ...messages, [messageId]: { text: message, sender: sender } },
    });
    this.props.sendMessage(messageId, message, sender, chatId);
  };

  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;
    if (
      Object.keys(prevState.messages).length < Object.keys(messages).length &&
      Object.values(messages)[Object.values(messages).length - 1].sender ===
        "me"
    ) {
      setTimeout(
        () => this.sendMessage("Не приставай ко мне, я робот!", "bot"),
        1000
      );
    }
  }

  render() {
    return (
      <div>
        <Header chatId={this.props.chatId} />
        <div className="content">
          <ChatList />
          <MessageField
            chatId={this.props.chatId}
            messages={this.state.messages}
            sendMessage={this.sendMessage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
