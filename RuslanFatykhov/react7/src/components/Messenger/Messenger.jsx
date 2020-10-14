import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, List, Typography } from "@material-ui/core";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ContactsList } from "../ContactsList";
import { ChatForm } from "../ChatForm/ChatForm";
import { ChatList } from "../ChatList/ChatList";

import cat from "./cat.png";

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    margin: "20px auto",
    width: "100%",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "600px",
  },
  information: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    marginTop: "100px",
    textAlign: "center",
  },
  cat: {
    marginTop: "50px",
    width: "300px",
    height: "300px",
  },
  side: {
    margin: "0",
    borderRight: "3px solid #3498db",
    borderLeft: "3px solid #3498db",
  },
  container: {
    borderLeft: "3px solid #3498db",
    borderRight: "3px solid #3498db",
  },
  chats: {
    marginBottom: "15px",
    marginTop: "15px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "600px",
  },
});

export const Messenger = ({
  messages,
  contacts,
  chatId,
  id,
  handleMessageSend,
  handleChatDelete,
  handleChatsReload,
  isLoading,
  isError,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Header />
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Grid className={classes.chats}>
            <Grid>
              <Typography variant="h6">Ваши чаты:</Typography>
              <ChatList handleChatDelete={handleChatDelete} />
            </Grid>
            <ChatForm />
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.side}>
          <List>{contacts && <ContactsList items={contacts} />}</List>
        </Grid>
        <Grid item xs={6} className={classes.main}>
          <Grid>
            {messages ? (
              <MessagesList items={messages} />
            ) : (
              <div className={classes.information}>
                <Typography variant="h4" className={classes.info}>
                  Выберите чат, в котором вы бы хотели продолжить общение.
                </Typography>
                <img src={cat} className={classes.cat} />
              </div>
            )}
          </Grid>
          <Grid>{messages && <MessageForm onSend={handleMessageSend} />}</Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
};
