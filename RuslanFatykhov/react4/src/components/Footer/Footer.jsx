import React, { Component } from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";

const styles = {
  footer: {
    textAlign: "right",
    justifyContent: "flex-end",
    backgroundColor: "#3498db",
  },
  footerText: {
    justifyContent: "flex-end",
  },
};

export class FooterClass extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <AppBar position="static" className={classes.footer}>
          <Toolbar className={classes.footerText}>
            <div>© Все права защищены, 2020</div>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  };
};

export const Footer = withStyles(styles)(FooterClass);
