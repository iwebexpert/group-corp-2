import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";

import {
  Grid,
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
  side: {
    margin: "0",
    borderRight: "3px solid #3498db",
    borderLeft: "3px solid #3498db",
  },
};

export class ContactsClass extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={4} className={classes.side}>
        <List>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ваня"
                secondary="был онлайн сегодня 12:25"
              />
            </ListItem>
          </Paper>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Аня"
                secondary="была онлайн сегодня 10:02"
              />
            </ListItem>
          </Paper>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Серёжа"
                secondary="был онлайн вчера 09:51"
              />
            </ListItem>
          </Paper>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Андрей"
                secondary="был онлайн вчера 07:12"
              />
            </ListItem>
          </Paper>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Дима" secondary="был онлайн вчера 06:29" />
            </ListItem>
          </Paper>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Оля" secondary="была онлайн вчера 02:10" />
            </ListItem>
          </Paper>
          <Paper className={classes.contact}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Саша"
                secondary="был онлайн в понедельник 11:49"
              />
            </ListItem>
          </Paper>
        </List>
      </Grid>
    );
  };
};

export const Contacts = withStyles(styles)(ContactsClass);
