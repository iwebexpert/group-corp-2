import React from "react";
import classNames from "classnames";

import "./Message.scss";

export const Message = (props) => {
  const { text, author, time } = props;

  const classes = classNames("message", {
    "message-user": author !== "Бот",
    "message-bot": author === "Бот",
  });

  return (
    <div className={classes}>
      {text} - <b className="message-author">{author}</b> <br />
      <b className="message-author">{time}</b>
    </div>
  );
};
