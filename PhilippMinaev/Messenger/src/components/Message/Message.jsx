import React, { Component } from "react";

import classNames from "classnames";

import "./Message.scss";

export const Message = ({ text, author }) => {
  const classes = classNames("message", {
    "message-sender": author !== "Robot",
    "message-bot": author === "Robot",
  });

  return (
    <div className={classes}>
      <ul>
        <li
          key={text}
          style={{ listStyleType: "none", fontFamily: "Courier Prime" }}
        >
          {text}
          <br /> <b className="message-author">{author}</b>
        </li>
      </ul>
    </div>
  );
};
