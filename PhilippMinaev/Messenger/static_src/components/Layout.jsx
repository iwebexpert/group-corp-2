import React from "react";
import ChatList from "./ChatList";
import Header from "./Header";
import MessageField from "./MessageField";
import PropTypes from "prop-types";
import "../styles/style.css";

export default class Layout extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
  };

  static defaultProps = {
    chatId: 1,
  };

  render() {
    return (
      <div>
        <Header chatId={this.props.chatId} />
        <div className="content">
          <ChatList />
          <MessageField chatId={this.props.chatId} />
        </div>
      </div>
    );
  }
}
