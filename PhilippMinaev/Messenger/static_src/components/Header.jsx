import React from "react";
import PropTypes from "prop-types";
import MessageField from "./MessageField";

export default class Header extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
  };

  static defaultProps = {
    chatId: 1,
  };

  render() {
    return (
      <div className="header">
        <span style={{ fontSize: "20px" }}>{this.props.chatId}</span>
      </div>
    );
  }
}
