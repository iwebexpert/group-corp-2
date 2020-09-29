import React from "react";
import PropTypes from "prop-types";

export default class Message extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className="message"
        style={{
          alignSelf: this.props.author === "Робот" ? "flex-start" : "flex-end",
        }}
      >
        <div>{this.props.text}</div>
        <div className="message-author">{this.props.author}</div>
      </div>
    );
  }
}
