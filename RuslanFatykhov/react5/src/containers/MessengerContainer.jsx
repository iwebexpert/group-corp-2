import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

import { Messenger } from "components/Messenger";

import {
  chatsLoadAction,
  chatsMessageSendAction,
  chatsAddAction,
} from "../actions/chats";

class MessengerContainerClass extends React.Component {
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

  handleChatAdd = (chat) => {
    const { chatId } = this.props;
    chat.id = nanoid();
    this.props.chatsAddAction({
      ...chat,
      chatId,
    });
  };

  render() {
    const { messages, contacts } = this.props;
    return (
      <div>
        <Messenger
          messages={messages}
          contacts={contacts}
          handleMessageSend={this.handleMessageSend}
          handleChatAdd={this.handleChatAdd}
        />
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const chats = state.chats.entries;
  const { match } = ownProps;

  let messages = null;
  let contacts = null;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
    contacts = chats[match.params.id].contacts;
  };

  return {
    messages,
    contacts,
    chatId: match ? match.params.id : null,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),

    chatsMessageSendAction: (message) =>
      dispatch(chatsMessageSendAction(message)),

    chatsAddAction: (chat) => dispatch(chatsAddAction(chat)),
  };
};

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerClass);
