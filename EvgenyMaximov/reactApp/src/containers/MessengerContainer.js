import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

import { Messenger } from "../components/Messenger";
import {
  chatsLoadAction,
  chatsMessageSendAction,
  messageDeleteAction,
  clearChatAction,
} from "../actions/chats";

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
    this.props.chatsLoadAction();
  };

  onMessageDelete = (id) => {
    const { messageDeleteAction, chatsLoadAction } = this.props;

    messageDeleteAction(id);
    chatsLoadAction();
  };

  onClearChat = (chatId) => {
    const { clearChatAction } = this.props;
    clearChatAction(chatId);
  };

  render() {
    const {
      messages,
      classform,
      classlist,
      chatTitle,
      classchattitle,
      isLoading,
      isError,
      isPending,
    } = this.props;

    return (
      <Messenger
        chatTitle={chatTitle}
        messages={messages}
        onMessageSend={this.onMessageSend}
        onMessageDelete={this.onMessageDelete}
        onClearChat={this.onClearChat}
        classform={classform}
        classlist={classlist}
        classchattitle={classchattitle}
        isLoading={isLoading}
        isError={isError}
        isPending={isPending}
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
    chatId: match ? +match.params.id : null,
    chatTitle,
    isLoading: state.chats.loading,
    isError: state.chats.error,
    isPending: state.chats.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispatch(chatsMessageSendAction(message)),
    messageDeleteAction: (message) => dispatch(messageDeleteAction(message)),
    clearChatAction: (chatId) => dispatch(clearChatAction(chatId)),
  };
};

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);
