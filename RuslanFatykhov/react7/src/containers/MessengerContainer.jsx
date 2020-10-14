import React, { Component }from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { push } from "connected-react-router";

import { Messenger } from "components/Messenger";
import {
  chatsLoadAction,
  chatsAddAction,
  messagesSendAction,
  fireChatAction,
  unfireChatAction,
} from "../actions/chats";

class MessengerContainerClass extends Component {
  componentDidMount() {
    this.props.chatsLoadAction();
  };

  handleMessageSend = (message) => {
    const { chatsMessageSendAction, chatId } = this.props;
    message.id = nanoid();
    this.props.messagesSendAction({
      ...message,
      chatId,
    });
  };

  render() {
    const {
      messages,
      contacts,
      fire,
      id,
      chatId,
      isLoading,
      isError,
    } = this.props;
    return (
      <Messenger
        messages={messages}
        contacts={contacts}
        id={id}
        chatId={chatId}
        fire={fire}
        handleMessageSend={this.handleMessageSend}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const chats = state.chats.entries;
  const { match } = ownProps;

  let messages = null;
  let contacts = null;
  let fire = null;
  let id = null;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
    contacts = chats[match.params.id].contacts;
    fire = chats[match.params.id].fire;
  };

  return {
    chats,
    messages,
    contacts,
    fire,
    chatId: match ? match.params.id : null,
    lastChatId: Object.keys(chats).length,
    isLoading: state.chats.loading,
    isError: state.chats.error,
  };
  this.props.messagesLoadAction();
};

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    messagesSendAction: (message) => dispatch(messagesSendAction(message)),
    chatsAddAction: (chatId, title) => dispatch(chatsAddAction(chatId, title)),
    fireChatAction: (chatId, fire) => dispatch(fireChatAction(chatId, fire)),
    unfireChatAction: (chatId, fire) =>
      dispatch(unfireChatAction(chatId, fire)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
  };
};

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);
