import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";
import { push } from "connected-react-router";
import { List, ListItem, ListItemText } from "@material-ui/core";

import "./ChatList.scss";

const ChatListFunction = (props) => {
  return (
    <List>
      {props.chats.map((chat) => (
        <ListItem key={chat.id}>
          <Link
            to={`/chats/${chat.id}`}
            className={`link ${chat.fire ? "fire" : ""}`}
          >
            <div className="btn">
              <ListItemText primary={chat.title} />
            </div>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

const mapStateToProps = (state, ownProps) => {
  const chatsEntries = state.chats.entries;
  const { match } = ownProps;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
  };

  const chats = [];
  for (let key in chatsEntries) {
    chats.push({
      title: chatsEntries[key].title,
      id: chatsEntries[key].id,
      fire: chatsEntries[key].fire,
    });
  };
  return {
    chats,
    chatId: match ? match.params.id : null,
    lastChatId: Object.keys(chats).length,
  };
};

export const ChatList = connect(
  mapStateToProps,
  null
)(ChatListFunction);
