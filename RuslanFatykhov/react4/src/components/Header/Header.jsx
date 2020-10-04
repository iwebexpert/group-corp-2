import React, { Component } from "react";
import rocket from "./rocket.png";
import { Switch, Route, Link } from "react-router-dom";

import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  withStyles,
} from "@material-ui/core";

const styles = {
  header: {
    backgroundColor: "#3498db",
    width: "100%",
  },
  rocket: {
    marginLeft: "20px",
    width: "50px",
    height: "50px",
  },
  nav: {
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    backgroundColor: "#3498db",
    boxSizing: "border-box",
    borderRadius: "5px",
    height: "100%",
    "&:hover": {
      background: "#3558db",
      height: "100%",
    },
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
  },
};

export class HeaderClass extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <AppBar position="static" className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5">Реактивный чат</Typography>
            <img src={rocket} className={classes.rocket} />
            <div className={classes.bar}>
              <ListItem>
                <Link to="/" className={classes.nav}>
                  <ListItemText primary="ГЛАВНАЯ" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/about" className={classes.nav}>
                  <ListItemText primary="О НАС" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/profile" className={classes.nav}>
                  <ListItemText primary="ПРОФИЛЬ" />
                </Link>
              </ListItem>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  };
};

export const Header = withStyles(styles)(HeaderClass);
