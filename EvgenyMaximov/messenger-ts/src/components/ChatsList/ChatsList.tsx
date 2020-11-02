import React, { useState } from "react";
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
import Tooltip from '@material-ui/core/Tooltip';

type ClassesType = {
	[propname:string]: string,
};

type ChatsListPropsType = {
	chats: ChatType[],
	isError: boolean,
	isLoading: boolean,
	onAdd: (chat:ChatType)=> void,
	onDelete: (chatId:number)=> void,
	unfireChat: (chatId:number)=> void,
	refreshChats: ()=> void,
};

const useStyles = makeStyles(():any => ({
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

export const ChatsList:React.FC<ChatsListPropsType> = ({ 
	chats,
	isError,
	isLoading,
	onAdd,
	onDelete,
	unfireChat,
	refreshChats }) => {

  const classes:ClassesType = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (chatId:number):void => {
    setSelectedIndex(chatId);
    if (chats[chatId].fire) {
      unfireChat(chatId);
    }
  };

  const [chat, setChat] = useState<ChatType>({ title: "", chatId: 0, messages: [], fire: false, id: 0 });

  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    const inputField:string = e.target.name;
    setChat({ ...chat, [inputField]: e.target.value });
  };

  const { title } = chat;

  const addChat = ():void => {
	 chat.chatId = chats.length;

    const titleRegExp:RegExp = /\S|(^\w$)/gi;

    if (!title || !titleRegExp.test(title)) {
      Swal.fire({
        text: "Введите название чата",
        icon: "error",
      });
      return;
    }

   	onAdd(chat);
      setChat({  title: "", chatId: 0, messages: [], fire: false, id: 0 });
  };

  const deleteChat = (chatId:number):void => {
    onDelete(chatId);
  };

  const keyDownHandler = (e:React.KeyboardEvent<HTMLDivElement>):void => {
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
		  <Tooltip title="Add" aria-label="add">
        <Fab variant="round" color="primary" size="small" onClick={addChat}>
          <AddIcon />
        </Fab>
		  </Tooltip>
      </div>
      <Divider />
      {isError ? (
        <div className={classes.renewBtn}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={refreshChats}
          >
            Обновить чаты
          </Button>
        </div>
      ) : (
        <List className={classes.chatList}>
          {isLoading && !chats.length ? (
            <div className="lds-dual-ring-header"></div>
          ) : chats.length ? (
            chats.map((c) => {
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
						<Tooltip title="Delete" aria-label="Delete">
                  	<div
                    	className={classes.deleteIcon}
                    	onClick={() => deleteChat(c.chatId)}
                 	 >
                    	<DeleteIcon fontSize="small" color="secondary" />
                 	 </div>
						</Tooltip>
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
