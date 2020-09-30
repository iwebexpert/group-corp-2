import React from "react";
import Message from "../Message";
import { withStyles } from "@material-ui/core";

const styles = {
  messagesList: {
    width: "700px",
    margin: "0 auto",
    padding: '20px 30px',
    minHeight: '200px',
    backgroundColor: 'rgb(224, 206, 242)',
  },
  messagesListItemLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '10px 0',
  },
  messagesListItemRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 0',
  },
  messagesContent: {
    backgroundColor: "#f097e7",
    padding: '7px 12px',
    borderRadius: '10px',
  }
};

const MessagesList = ({ messages, classes }) => {
  console.log(classes);
  return (
    <div className={classes.messagesList}>
      {messages.map((item) => {
        return <Message backCol={classes.messagesContent} styles={item.author === 'Бот' ? classes.messagesListItemLeft: classes.messagesListItemRight} data={item} />;
      })}
    </div>
  );
};

export default withStyles(styles)(MessagesList);
