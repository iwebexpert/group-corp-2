import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { TextField, Fab, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import AddIcon from "@material-ui/icons/Add";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DeleteIcon from "@material-ui/icons/Delete";

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

  emptyList: {
    textAlign: "center",
    fontSize: "20px",
    color: "rgb(110, 105, 105)",
  },

  addChatForm: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px 5px 0px",
  },

  chatTitle: {
    paddingRight: "30px",
  },

  chatLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  deleteIcon: {
    alignSelf: "flex-end",
    alignContent: "flex-start",
    zIndex: "10",
  },

  renewBtn: {
    alignSelf: "center",
    marginTop: "5px",
  },
}));

export const ChatsList = (props) => {
  const classes = useStyles();

  const isLoading = useSelector((state) => state.chats.loading);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (chatId) => {
    setSelectedIndex(chatId);
    if (props.chats[chatId].fire) {
      props.unfireChat(chatId);
    }
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

  const deleteChat = (chatId) => {
    props.onDelete(chatId);
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
      {props.isError ? (
        <div className={classes.renewBtn}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={props.refreshChats}
          >
            Обновить чаты
          </Button>
        </div>
      ) : (
        <List className={classes.chatList}>
          {isLoading && !props.chats.length ? (
            <div className="lds-dual-ring-header"></div>
          ) : props.chats.length ? (
            props.chats.map((c) => {
              return (
                <ListItem
                  className={classes.chatLabel}
                  key={c.chatId}
                  button
                  selected={selectedIndex === c.chatId}
                  onClick={() => handleListItemClick(c.chatId)}
                >
                  <Link to={`/chats/${c.chatId}`} className="chat-label">
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={c.title}
                      className={classes.chatTitle}
                    />
                  </Link>
                  {c.fire ? (
                    <FiberManualRecordIcon fontSize="small" color="primary" />
                  ) : null}
                  <div
                    className={classes.deleteIcon}
                    onClick={() => deleteChat(c.chatId)}
                  >
                    <DeleteIcon fontSize="small" color="secondary" />
                  </div>
                </ListItem>
              );
            })
          ) : (
            <div className={classes.emptyList}>
              <p>Чатов нет</p>
            </div>
          )}
          <Divider />
        </List>
      )}
    </div>
  );
};
