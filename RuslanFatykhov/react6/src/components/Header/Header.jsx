import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { push } from "connected-react-router";
import { withRouter } from "react-router";

import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import rocket from "./rocket.png";


const useStyles = makeStyles({
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
    margin: "0 15px",
    boxSizing: "border-box",
    cursor: "pointer",
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
});

export const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Реактивный чат</Typography>
          <img src={rocket} className={classes.rocket} />
          <div className={classes.bar}>
            <ListItem className={classes.nav}>
              <ListItemText
                primary="ГЛАВНАЯ"
                onClick={() => history.push("/")}
              />
            </ListItem>
            <ListItem className={classes.nav}>
              <ListItemText
                primary="О НАС"
                onClick={() => history.push("/about")}
              />
            </ListItem>
            <ListItem className={classes.nav}>
              <ListItemText
                primary="ПРОФИЛЬ"
                onClick={() => history.push("/profile")}
              />
            </ListItem>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
