import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import './Navbar.css';

import { Link } from "react-router-dom";

export default function Navbar(props) {
  return(
    <AppBar  position="static" className="navbar">
      <Toolbar className="navbar__toolbar">
        <h1 className="navbar__title">МЕССЕНДЖЕР</h1>
        <Link to={`/chats`} className="link-button">
          <IconButton color="inherit">
            <MessageOutlinedIcon />
          </IconButton>
        </Link>
        <Link to={`/profile`} className="link-button">
          <IconButton color="inherit">
            <Avatar className="navbar__avatar" src="https://sun9-28.userapi.com/1Q5flJTbLsSbAnuUSrkW71BHBwNbc-v7yN4Kmw/7N2suGQ0XNQ.jpg" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}