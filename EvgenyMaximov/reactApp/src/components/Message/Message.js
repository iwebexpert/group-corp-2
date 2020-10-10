import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";

import "./Message.scss";

export const Message = (props) => {
  const { text, author, time, onDelete, id } = props;

  const classes = classNames("message", {
    "message-user": author !== "Бот",
    "message-bot": author === "Бот",
  });

  const deleteMessage = () => {
    onDelete(id);
  };

  return (
    <div className={classes}>
      {author !== "Бот" ? (
        <div className="delete-icon" key={id} onClick={deleteMessage}>
          <CloseIcon fontSize="small" />
        </div>
      ) : null}
      {text} - <b className="message-author">{author}</b> <br />
      <b className="message-author">{time}</b>
    </div>
  );
};
