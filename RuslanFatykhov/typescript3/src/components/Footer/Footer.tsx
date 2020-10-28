import React from "react";
import { AppBar, Grid, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    textAlign: "right",
    justifyContent: "flex-end",
    backgroundColor: "#3498db",
  },
  footerText: {
    justifyContent: "flex-end",
  },
});

export const Footer: React.FC<{}> = () => {
  const classes = useStyles();
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
