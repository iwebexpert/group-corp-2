import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";

import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  withStyles,
} from "@material-ui/core";

const styles = {
  contact: {
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#e5e5ea",
    marginLeft: "10px",
    marginRight: "10px",
  },
};

export class ContactClass extends Component {
  render() {
    const { classes } = this.props;
    const { name, online } = this.props;

    return (
      <Paper className={classes.contact}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={online} />
        </ListItem>
      </Paper>
    );
  };
};

export const Contact = withStyles(styles)(ContactClass);
