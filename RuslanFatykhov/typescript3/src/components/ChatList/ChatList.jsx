import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";
import "./ChatList.scss";

export const ChatList = (props) => {
  const chatsEntries = useSelector((state) => state.chats.entries);
  const chats = [];
  for (let key in chatsEntries) {
    chats.push({
      title: chatsEntries[key].title,
      id: chatsEntries[key].id,
      fire: chatsEntries[key].fire,
    });
  }
  return (
    <List>
      {chats.map((chat) => (
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
