import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

import { Messenger } from "components/Messenger";
import {
  chatsLoadAction,
  chatsMessageSendAction,
  addChatAction,
} from "../actions/chats";

class MessengerContainerClass extends Component {
  componentDidMount() {
    this.props.chatsLoadAction();
  }

  handleMessageSend = (message) => {
    const { chatId } = this.props;
    message.id = nanoid();
    this.props.chatsMessageSendAction({
      ...message,
      chatId,
    });
  };

  handleAddChat = (chat) => {
    this.props.addChatAction({
      chat,
    });
  };

  render() {
    const { messages, chats, title } = this.props;
    return (
      <Messenger
        chats={chats}
        messages={messages}
        title={title}
        handleMessageSend={this.handleMessageSend}
        handleAddChat={this.handleAddChat}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const chats = state.chats.entries;
  const { match } = ownProps;

  let messages = null;
  let title = null;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
    title = chats[match.params.id].title;
  }

  return {
    messages,
    title,
    chatId: match ? match.params.id : null,
    chats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispatch(chatsMessageSendAction(message)),
    addChatAction: (chat) => dispatch(addChatAction(chat)),
  };
}

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);
