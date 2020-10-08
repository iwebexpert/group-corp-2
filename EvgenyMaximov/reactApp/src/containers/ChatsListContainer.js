import React from "react";
import { connect } from "react-redux";

import { ChatsList } from "../components/ChatsList";
import { chatsLoadAction, addChatAction } from "../actions/chats";

class ChatsListContainerClass extends React.Component {
  componentDidMount() {
    this.props.chatsLoadAction();
  }

  addChat = (chat) => {
    const { chats } = this.props;
    chat.id = chats.length;
    chat.messages = [];
    this.props.addChatAction({ chat });
  };

  render() {
    const { chats } = this.props;
    return <ChatsList chats={chats} onAdd={this.addChat} />;
  }
}

const mapStateToProps = (state) => {
  const chats = state.chats.entries;

  return {
    chats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    addChatAction: (chat) => dispatch(addChatAction(chat)),
  };
};

export const ChatsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsListContainerClass);
