import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  Fab,
  withStyles,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { Switch, Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { push } from "connected-react-router";

import { chatsAddAction } from "../../actions/chats";

import { ChatList } from "../ChatList";

const styles = {
  form: {
    paddingRight: "15px",
  },
};

class ChatFormClass extends Component {
  state = {
    inputValue: "",
    showError: false,
    errorText: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleChatAdd = () => {
    const { chatsAddAction, redirect, lastChatId } = this.props;
    const { inputValue } = this.state;

    const title = inputValue;

    if (!inputValue) {
      this.setState({ errorText: "Вы забыли ввести название чата" });
      return;
    } else {
      this.setState({ errorText: "" });
    };

    if (title) {
      chatsAddAction(lastChatId, title);
      redirect(lastChatId);
      this.setState({ inputValue: "" });
    };
  };

  render() {
    const { chats, classes, chatId, id } = this.props;
    const { inputValue, errorText } = this.state;

    return (
      <Grid>
        <Typography variant="h6">Добавьте новый чат:</Typography>
        <Grid container justify="space-around" className={classes.form}>
          <Grid item xs={10}>
            <TextField
              label="Введите название чата"
              type="text"
              value={inputValue}
              onChange={this.handleChange}
              helperText={errorText}
              error={!!errorText}
              fullWidth
            />
          </Grid>

          <Grid item xs={2}>
            <Fab variant="round" color="primary" onClick={this.handleChatAdd}>
              <Send />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const chats = state.chats.entries;
  const { match } = ownProps;

  let messages = null;

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages;
  };

  return {
    chats,
    messages,
    chatId: match ? match.params.id : null,
    lastChatId: Object.keys(chats).length,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    chatsAddAction: (chatId, title) => dispatch(chatsAddAction(chatId, title)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
  };
};

export const ChatForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChatFormClass));
