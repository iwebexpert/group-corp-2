import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";
import { push } from "connected-react-router";

import { chatsLoadAction, deleteChatAction } from "../../actions/chats";

import { List, ListItem, ListItemText } from "@material-ui/core";

import "./ChatList.scss";

class ChatListClass extends Component {
  render() {
    const { chats, id, chatId, handleChatDelete } = this.props;

    return (
      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id}>
            <Link
              to={`/chats/${chat.id}`}
              className={`link ${chat.fire ? "fire" : ""}`}
            >
              <div className="btn">
                 <IconButton onClick={handleChatDelete}>
                  <HighlightOffIcon fontSize="default" style={{ fill: "red" }} />
                </IconButton>
                <ListItemText primary={chat.title} />
              </div>
            </Link>
          </ListItem>
        ))}
      </List>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const chatsEntries = state.chats.entries;
  const { match } = ownProps;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
  }

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

function mapDispatchToProps(dispatch) {
  return {
    deleteChatAction: (chatId) => dispatch(deleteChatAction(chatId)),
  };
};

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListClass);
