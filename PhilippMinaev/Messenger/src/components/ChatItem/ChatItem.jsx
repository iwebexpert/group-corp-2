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

export class ChatItem extends Component {
  chatClickHandler = () => {
    const { onClick, id } = this.props;
    if (typeof onClick === "function") {
      onClick(id);
    }
  };

  render() {
    const { avatar, author, id, fire, title } = this.props;
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
            onClick={this.chatClickHandler}
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
  }
}
