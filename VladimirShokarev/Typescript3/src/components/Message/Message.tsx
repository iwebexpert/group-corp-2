import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";

export type MessageType = {
  text: string;
  author: string;
};

export const messageType = {
    text: PropTypes.string.isRequired,
};

export const Message: React.FC<MessageType> = (props) => {

    const { text, author } = props;
    const classes = classNames("message", {
        "message-sender": author !== "Bot",
        "message-bot": author === "Bot",
    });

    return (
      <div className={classes}>
        {text} - <b className="message-author">{author}</b>
      </div>
    );
};