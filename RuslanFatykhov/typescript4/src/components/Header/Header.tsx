import React from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";

import rocket from "./rocket.png";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  ListItemText,
  Theme,
  useTheme,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export const Header: React.FC<{}> = () => {
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);
  const history = useHistory<History>();

  return (
    <Grid container>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Реактивный чат</Typography>
          <img src={rocket} className={classes.rocket} alt="rocket" />
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
