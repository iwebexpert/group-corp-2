import React, { Component } from "react";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ContactsList } from "../ContactsList";
import { ChatForm } from "../ChatForm/ChatForm";
import cat from "./cat.png";

import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  TextField,
  Fab,
  Button,
  withStyles,
} from "@material-ui/core";

const styles = {
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
    borderRight: "3px solid #3498db",
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
};

export class MessengerClass extends Component {
  render() {
    const {
      messages,
      contacts,
      handleMessageSend,
      handleChatAdd,
      classes,
    } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Header />
        <Grid container>
          <ChatForm onSend={handleChatAdd} />
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
            <Grid>
              {messages && <MessageForm onSend={handleMessageSend} />}
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  };
};

export const Messenger = withStyles(styles)(MessengerClass);
