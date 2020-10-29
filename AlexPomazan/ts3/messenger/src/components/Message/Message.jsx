import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";

export const Message = (props) => {
  const { text, author, img } = props;

  const classes = classNames("text", {
    "message-sender": author !== "Bot Bob",
    "message-bot": author === "Bot Bob",
  });

  return (
    <div className={classes}>
      <div className="message__img">
        <img className="img-author" src={img} alt="" />
      </div>
      <div className="message">
        <b className="message__author">{author}</b>
        <p className="message__text">{text}</p>
      </div>
    </div>
  );
}
Message.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
