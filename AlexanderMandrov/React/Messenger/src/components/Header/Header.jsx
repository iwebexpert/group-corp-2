import React from 'react';
import './Header.scss';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { root, menuButton, title, appBar } = classes;
  return (
    <div className={root}>
      <AppBar position="static" className={appBar}>
        <Toolbar>
          <IconButton edge="start" className={menuButton} color="inherit">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={title}>
            Messenger
          </Typography>
          <IconButton edge="start" className={menuButton} color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;