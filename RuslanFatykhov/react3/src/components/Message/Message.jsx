import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, withStyles } from "@material-ui/core";

import "./Message.scss";

export const messageType = {
  text: PropTypes.string.isRequired,
};

export class Message extends Component {
  static propTypes = messageType;

  render() {
    const { text, author } = this.props;

    const classes = classNames("message", {
      "message-sender": author !== "Робот",
      "message-bot": author === "Робот",
    });

    return (
      <Grid className={classes}>
        <div className="box">
          <b className="message-author">{author}</b>: {text}
        </div>
      </Grid>
    );
  };
};
