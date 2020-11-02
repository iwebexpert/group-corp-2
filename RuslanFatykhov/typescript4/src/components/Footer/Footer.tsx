import React from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  Theme,
  useTheme,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    textAlign: "right",
    justifyContent: "flex-end",
    backgroundColor: "#3498db",
  },
  footerText: {
    justifyContent: "flex-end",
  },
}));

export const Footer: React.FC<{}> = () => {
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);

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
