import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "components/Messenger";
import { Error } from "../pages/Error";
import { mapStateToProps } from "../mapForConnect/mapStateToProps";
import { mapDispatchToProps } from "../mapForConnect/mapDispatchToProps";

class MessengerContainerClass extends React.Component {
  componentDidMount() {
    if (this.props.chatId == null) {
      this.props.chatsLoadAction();
      this.props.profileLoadAction();
      this.props.robotLoadAction();
    }
  }

  handleMessageSend = (message) => {
    const { chatId, chatsMessageSendAction } = this.props;
    chatsMessageSendAction({
      ...message,
      id: nanoid(),
      chatId,
    });
  };

  render() {
    return <Messenger {...this.props} onAdd={this.handleMessageSend} />;
  }
}

export const MessengerContainer = connect(
  mapStateToProps("MessengerContainer"),
  mapDispatchToProps("MessengerContainer")
)(MessengerContainerClass);
