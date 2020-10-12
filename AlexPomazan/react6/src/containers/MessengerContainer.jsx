import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { push } from "connected-react-router";

import { Messenger } from "components/Messenger";
import {
  chatsLoadAction,
  chatsMessageSendAction,
  addChatAction,
} from "../actions/chats";

class MessengerContainerClass extends Component {
  componentDidMount() {
    if (!this.props.chats.length) {
      this.props.chatsLoadAction();
    }
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
    const { addChatAction, redirect, lastChatId } = this.props;
    addChatAction({
      chat,
    });
    redirect(lastChatId);
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
    lastChatId: Object.keys(chats).length,
    chatId: match ? match.params.id : null,
    chats,
    chatFire: match.params.id ? chats[match.params.id].fire : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispatch(chatsMessageSendAction(message)),
    addChatAction: (chat) => dispatch(addChatAction(chat)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
  };
}

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);
