import React, { Component } from "react";
import {
  Grid,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Fab,
  Button,
  withStyles,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Send } from "@material-ui/icons";
import { Switch, Route, Link } from "react-router-dom";
import { chats } from "../../helpers/chatsData";

const styles = {
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 0",
    backgroundColor: "#3498db",
    boxSizing: "border-box",
    borderRadius: "5px",
    width: "100%",
    textAlign: "center",
    height: "100%",
    "&:hover": {
      background: "#3558db",
      height: "100%",
    },
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
  form: {
    paddingRight: "15px",
  },
};

export class ChatsListClass extends Component {
  state = {
    chats,
    inputValue: "",
    showError: false,
    errorText: "",
  };

  handleChange = (value) => {
    this.setState({ ...this.state, inputValue: value });
  };

  handleChatAdd = () => {
    if (!this.state.inputValue) {
      this.setState({ errorText: "Вы забыли ввести своё имя или сообщение" });
      return;
    } else {
      this.setState({ errorText: "" });
    };

    const newTitle = this.state.inputValue;

    let { chats } = this.state;
    chats.push({
      id: this.state.chats.length,
      title: newTitle,
      messages: [
        {
          id: 0,
          author: "Неизвестный",
          text: "А ты еще кто?",
        },
      ],
      contacts: [
        {
          id: 0,
          name: "Неизвестный человек",
          online: "был онлайн сегодня 01:45",
        },
        {
          id: 1,
          name: "Какой-то тип",
          online: "был онлайн сегодня 16:14",
        },
        {
          id: 2,
          name: "Случайный собеседник",
          online: "был онлайн вчера 09:38",
        },
      ],
    });
    this.setState({ chats, inputValue: "" });
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
      <Grid item xs={3}>
        <Grid className={classes.chats}>
          <Grid>
            <Typography variant="h6">Ваши чаты:</Typography>
            {chatsList}
          </Grid>
          <Grid>
            <Typography variant="h6">Добавьте новый чат:</Typography>
            <Grid container justify="space-around" className={classes.form}>
              <Grid item xs={10}>
                <TextField
                  label="Введите название чата"
                  type="text"
                  value={this.inputValue}
                  onChange={(e) => this.handleChange(e.target.value)}
                  helperText={this.state.errorText}
                  error={!!this.state.errorText}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <Fab
                  variant="round"
                  color="primary"
                  onClick={this.handleChatAdd}
                >
                  <Send />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
};

export const ChatsList = withStyles(styles)(ChatsListClass);
