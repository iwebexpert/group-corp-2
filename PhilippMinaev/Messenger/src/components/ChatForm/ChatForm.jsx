import React, { Component } from "react";
import { IconButton, TextField, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import "./ChatForm.css";

const styles = {
  root: {
    color: "red",
    fontFamily: "Courier Prime",
  },
  multilineColor: {
    color: "white",
  },
};

class ChatFormClass extends Component {
  state = {
    nameChat: "",
  };

  handleInputChange = (event) => {
    this.setState({ ["nameChat"]: event.target.value });
  };

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  handleChatSend = () => {
    const { onSend } = this.props;
    const { nameChat } = this.state;

    if (this.isEmpty(nameChat)) {
      alert("Enter chat name!");
      return;
    }

    if (typeof onSend === "function") {
      onSend(nameChat);

      this.setState({
        nameChat: "",
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleChatSend();
    }
  };

  render() {
    const { nameChat } = this.state;
    const { classes } = this.props;

    return (
      <div className="btnAddChat">
        <TextField
          label="Enter chat name..."
          name="nameChat"
          value={nameChat}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          InputProps={{
            classes: {
              input: classes.multilineColor,
            },
          }}
          multiline
          fullWidth
          inputProps={{ maxLength: 15 }}
        />

        <IconButton
          aria-label="add"
          className={classes.root}
          onClick={this.handleChatSend}
        >
          <AddIcon />
        </IconButton>
      </div>
    );
  }
}

export const ChatForm = withStyles(styles)(ChatFormClass);
