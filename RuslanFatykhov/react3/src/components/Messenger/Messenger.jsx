import React, { Component } from "react";
import { Container, Grid, List, withStyles } from "@material-ui/core";
import { nanoid } from "nanoid";

import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Contacts } from "../Contacts";

const styles = {
  root: {
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "1140px",
    margin: "20px auto",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "3px solid #3498db",
  },
};

class MessengerClass extends Component {
  state = {
    messages: [{ author: "Руслан", text: "Привет! Как дела?", id: nanoid() }],
  };

  handleMessageSend = (message) => {
    message.id = nanoid();
    this.setState({
      messages: [...this.state.messages, message],
    });
  };

  componentDidUpdate() {
    const { author } = this.state.messages[this.state.messages.length - 1];
    if (author !== "Робот") {
      setTimeout(() => {
        this.handleMessageSend({
          text: `Привет, ${author}! Бот на связи.`,
          author: "Робот",
        });
      }, 1000);
    };
  };

  render() {
    const { messages } = this.state;
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={2}>
        <Header />
        <Grid container>
          <Contacts />
          <Grid item xs={8} className={classes.main}>
            <Grid item xs={12}>
              <MessagesList items={messages} />
            </Grid>
            <Grid>
              <MessageForm onSend={this.handleMessageSend} />
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  };
};

export const Messenger = withStyles(styles)(MessengerClass);
