import React, { Component } from "react";
import { TextField, Fab, withStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0 auto",
    marginTop: "15px",
    width: "90%",
  },
  btn: {
    backgroundColor: "red",
  },
  label: {
    fontSize: "26",
    fontFamily: "Courier Prime",
  },
};

class MessageFormClass extends Component {
  state = {
    author: this.props.profile,
    text: "",
  };

  handleInputChange = (event) => {
    this.setState({ ["text"]: event.target.value });
  };

  isEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  handleMessageSend = () => {
    const { onSend } = this.props;
    const { author, text } = this.state;

    if (this.isEmpty(text) || this.isEmpty(author)) {
      alert("Empty input field!");

      return;
    }

    if (typeof onSend === "function") {
      onSend(this.state);
      this.setState({
        text: "",
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleMessageSend();
    }
  };

  render() {
    const { text } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          label="Enter text..."
          name="text"
          value={text}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          InputLabelProps={{
            style: { fontSize: 13, fontFamily: "Courier Prime" },
          }}
          multiline
          fullWidth
        />
        <Fab
          variant="round"
          onClick={this.handleMessageSend}
          className={classes.btn}
        >
          <Send />
        </Fab>
      </div>
    );
  }
}

export const MessageForm = withStyles(styles)(MessageFormClass);
