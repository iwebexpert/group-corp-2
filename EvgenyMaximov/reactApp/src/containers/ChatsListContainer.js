import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { ChatsList } from "../components/ChatsList";
import {
  chatsLoadAction,
  addChatAction,
  chatUnfireAction,
} from "../actions/chats";

class ChatsListContainerClass extends React.Component {
  componentDidMount() {
    if (!this.props.chats.length) {
      this.props.chatsLoadAction();
    }
  }

  addChat = (chat) => {
    const { chats, addChatAction, redirect } = this.props;
    chat.chatId = chats.length;
    chat.messages = [];
    chat.fire = false;
    addChatAction({ chat });
    redirect(chat.chatId);
  };

  unfireChat = (chatId) => {
    const { chatUnfireAction } = this.props;
    chatUnfireAction(chatId);
  };

  render() {
    const { chats, location } = this.props;
    return (
      <ChatsList
        chats={chats}
        onAdd={this.addChat}
        unfireChat={this.unfireChat}
        location={location}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const chats = state.chats.entries;

  const { location } = state.router;

  return {
    chats,
    lastChatId: chats.length,
    location: location.pathname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    addChatAction: (chat) => dispatch(addChatAction(chat)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    chatUnfireAction: (chatId) => dispatch(chatUnfireAction(chatId)),
  };
};

export const ChatsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsListContainerClass);
