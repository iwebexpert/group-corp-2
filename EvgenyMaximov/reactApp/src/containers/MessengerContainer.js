import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

import { Messenger } from "../components/Messenger";
import { chatsLoadAction, chatsMessageSendAction } from "../actions/chats";

class MessengerContainerClass extends React.Component {
  onMessageSend = (message) => {
    message.id = nanoid();
    const { chatId } = this.props;

    const time = new Date();
    message.time = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour24: true,
    });

    this.props.chatsMessageSendAction({
      ...message,
      chatId,
    });
  };

  render() {
    const {
      messages,
      classform,
      classlist,
      chatTitle,
      classchattitle,
    } = this.props;

    return (
      <Messenger
        chatTitle={chatTitle}
        messages={messages}
        onMessageSend={this.onMessageSend}
        classform={classform}
        classlist={classlist}
        classchattitle={classchattitle}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const chats = state.chats.entries;
  const { match } = ownProps;

  let messages = [];
  let chatTitle = null;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
    chatTitle = chats[match.params.id].title;
  }

  return {
    messages,
    chatId: match ? match.params.id : null,
    chatTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispatch(chatsMessageSendAction(message)),
  };
};

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);