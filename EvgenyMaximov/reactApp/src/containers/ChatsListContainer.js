import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { ChatsList } from "../components/ChatsList";
import {
  chatsLoadAction,
  addChatAction,
  chatUnfireAction,
  chatDeleteAction,
} from "../actions/chats";

class ChatsListContainerClass extends React.Component {
  componentDidMount() {
    if (!this.props.chats.length) {
      this.props.chatsLoadAction();
    }
  }

  addChat = (chat) => {
    console.log(this.props);
    const { chats, addChatAction, chatsLoadAction, redirect } = this.props;
    chat.chatId = chats.length;
    chat.messages = [];
    chat.fire = false;
    addChatAction(chat);
    chatsLoadAction();
    redirect(chat.chatId);
  };

  unfireChat = (chatId) => {
    const { chatUnfireAction, chatsLoadAction } = this.props;
    chatUnfireAction(chatId);
    chatsLoadAction();
  };

  deleteChat = (chatId) => {
    const {
      chats,
      chatDeleteAction,
      redirect,
      redirectToHomePage,
    } = this.props;
    chatDeleteAction(chatId);
    if (chats.length > 1) {
      redirect(chats.length - 2);
    } else redirectToHomePage();
  };

  render() {
    const { chats, location } = this.props;
    return (
      <ChatsList
        chats={chats}
        onAdd={this.addChat}
        onDelete={this.deleteChat}
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
    redirectToHomePage: () => dispatch(push("/")),
    chatUnfireAction: (chatId) => dispatch(chatUnfireAction(chatId)),
    chatDeleteAction: (chatId) => dispatch(chatDeleteAction(chatId)),
  };
};

export const ChatsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsListContainerClass);
