import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Send } from "@material-ui/icons";
import { nanoid } from "nanoid";
import { Switch, Route, Link } from "react-router-dom";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ChatsList } from "../ChatsList";
import { ContactsList } from "../ContactsList";
import { chats } from "../../helpers/chatsData";
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
    minHeight: "650px",
  },
  side: {
    margin: "0",
    borderRight: "3px solid #3498db",
    borderLeft: "3px solid #3498db",
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
};

export class MessengerClass extends Component {
  state = {
    chats,
  };

  handleMessageSend = (message) => {
    const { chats } = this.state;
    const { match } = this.props;

    const chat = chats[match.params.id];
    message.id = nanoid();
    chat.messages = [...this.messages, message];

    chats[match.params.id] = chat;

    this.setState({
      chats,
    });
  };

  componentDidUpdate() {
    setTimeout(() => {
      const { author } = this.messages[this.messages.length - 1];
      if (author !== "Робот") {
        this.handleMessageSend({
          text: `Привет, ${author}! Бот на связи.`,
          author: "Робот",
        });
      }
    }, 2000);
  };

  get messages() {
    const { chats } = this.state;
    const { match } = this.props;

    let messages = null;

    if (match && chats[match.params.id]) {
      messages = chats[match.params.id].messages;
    };

    return messages;
  };

  get contacts() {
    const { chats } = this.state;
    const { match } = this.props;

    let contacts = null;

    if (match && chats[match.params.id]) {
      contacts = chats[match.params.id].contacts;
    };

    return contacts;
  };

  render() {
    const { chats } = this.state;
    const messages = this.messages;
    const contacts = this.contacts;

    const { classes } = this.props;

    const chatsList = chats.map((item) => (
        <ListItem key={item.id}>
          <Link to={`/chats/${item.id}`} className={classes.link}>
            <ListItemText primary={item.title} />
          </Link>
        </ListItem>
    ));

    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Header />
          <Grid container>
            <ChatsList />
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
                {messages && <MessageForm onSend={this.handleMessageSend} />}
              </Grid>
            </Grid>
          </Grid>
          <Footer />
        </Grid>
      </div>
    );
  };
};

export const Messenger = withStyles(styles)(MessengerClass);
