import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import classNames from "classnames";
import { Link } from "react-router-dom";

import "./ChatItem.css";

export const ChatItem = ({ avatar, title, id, fire, onClick }) => {
  const chatClickHandler = () => {
    if (typeof onClick === "function") {
      onClick(id);
    }
  };

  return (
    <div>
      <Link
        to={`/chats/${id}`}
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <ListItem
          alignItems="center"
          className={classNames({ fire: fire })}
          key={id}
          onClick={chatClickHandler}
        >
          <ListItemAvatar>
            <Avatar src={avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={title}
            style={{ fontFamily: "Courier Prime" }}
          />
        </ListItem>
      </Link>
      <Divider variant="inset" component="li" />
    </div>
  );
};
