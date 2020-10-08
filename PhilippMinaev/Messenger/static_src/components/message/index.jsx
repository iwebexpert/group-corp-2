import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

export default class Message extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className="message"
        style={{
          alignSelf: this.props.sender === "me" ? "flex-end" : "flex-start",
        }}
      >
        <div>{this.props.text}</div>
        <div className="message-sender">{this.props.sender}</div>
      </div>
    );
  }
}
