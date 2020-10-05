import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, messageType } from "../Message";
import "./MessagesList.css";

export class MessagesList extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="messages-list">
        {items.map((item) => (
          <Message {...item} key={item.id} />
        ))}
      </div>
    );
  }
}

MessagesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(messageType)),
};
