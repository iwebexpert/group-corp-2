import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

import { Messenger } from "../components/Messenger";
import { chatsLoadAction, chatsMessageSendAction } from "../actions/chats";
import { profileLoadAction } from "../actions/profile";

class MessengerContainerClass extends React.Component {
  componentDidMount() {
    this.props.chatsLoadAction();
  }

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
  const profile = state.profile.entries;
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
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispatch(chatsMessageSendAction(message)),
    profileLoadAction: () => dispatch(profileLoadAction()),
  };
};

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);
