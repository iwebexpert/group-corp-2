import React, { useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { Divider } from "@material-ui/core";
import { TextField, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20%",
    height: "758px",
    backgroundColor: "rgb(228, 222, 222)",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },

  chatList: {
    flex: "1 1 auto",
  },

  addChatForm: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px 5px 0px",
  },
}));

export const ChatsList = (props) => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const [chat, setChat] = useState({ title: "" });

  const onInputChange = (e) => {
    const inputField = e.target.name;
    setChat({ ...chat, [inputField]: e.target.value });
  };

  const { title } = chat;

  const addChat = () => {
    const { onAdd } = props;

    const titleRegExp = /\S|(^\w$)/gi;

    if (!title || !titleRegExp.test(title)) {
      Swal.fire({
        text: "Введите название чата",
        icon: "error",
      });
      return;
    }

    if (typeof addChat === "function") {
      onAdd(chat);

      setChat({ title: "" });
    }
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) addChat();
  };

  return (
    <div className={classes.root}>
      <div className={classes.addChatForm}>
        <TextField
          label="Добавить чат"
          name="title"
          type="text"
          value={title}
          onChange={onInputChange}
          onKeyDown={keyDownHandler}
        />
        <Fab variant="round" color="primary" size="small" onClick={addChat}>
          <AddIcon />
        </Fab>
      </div>
      <Divider />
      <List className={classes.chatList}>
        {props.chats.map((c) => {
          return (
            <ListItem
              key={c.id}
              button
              selected={selectedIndex === c.id}
              onClick={() => handleListItemClick(c.id)}
            >
              <Link to={`/chats/${c.id}`} className="chat-label">
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={c.title} />
              </Link>
            </ListItem>
          );
        })}
        <Divider />
      </List>
    </div>
  );
};
