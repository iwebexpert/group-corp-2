import React, { Component } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import rocket from "./rocket.png";

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
};

export class HeaderClass extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <Typography variant="h5">Реактивный чат</Typography>
            <img src={rocket} className={classes.rocket} />
          </Toolbar>
        </AppBar>
      </Grid>
    );
  };
};

export const Header = withStyles(styles)(HeaderClass);
