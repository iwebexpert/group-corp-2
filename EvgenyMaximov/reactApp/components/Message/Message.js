import React from "react";
import classNames from "classnames";

import "./Message.scss";

export const Message = (props) => {
  const { text, author } = props;

  const classes = classNames("message", {
    "message-user": author !== "Бот",
    "message-bot": author === "Бот",
  });

  const time = new Date();

  return (
    <div className={classes}>
      {text} - <b className="message-author">{author}</b> <br />
      <b className="message-author">
        {time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour24: true,
        })}
      </b>
    </div>
  );
};
