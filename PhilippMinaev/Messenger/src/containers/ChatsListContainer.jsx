import React from "react";
import { connect } from "react-redux";

import { ChatsList } from "../components/ChatsList";
import { mapStateToProps } from "../mapForConnect/mapStateToProps";
import { mapDispatchToProps } from "../mapForConnect/mapDispatchToProps";

class ChatsListContainerClass extends React.Component {
  componentDidMount() {
    if (this.props.chatsLoad == null) {
      this.props.chatsLoadAction();
    }
  }

  chatAddHandler = (newchat) => {
    const { chatsListSendAction, redirect, lastChatId } = this.props;
    chatsListSendAction({
      author: newchat,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTk0936CmLeNxPOJFyot8uCx1kU27hoqS5CbA&usqp=CAU",
    });
    redirect(lastChatId);
  };

  chatClickHandler = (chatId) => {
    const { messageUnfireAction } = this.props;
    if (chatId >= 0) {
      messageUnfireAction({ chatId });
    }
  };

  render() {
    const { chatsLoad, fireListId } = this.props;
    return (
      <ChatsList
        chats={chatsLoad}
        fireChats={fireListId}
        onAdd={this.chatAddHandler}
        onClick={this.chatClickHandler}
      />
    );
  }
}
export const ChatsListContainer = connect(
  mapStateToProps("ChatsListContainer"),
  mapDispatchToProps("ChatsListContainer")
)(ChatsListContainerClass);
