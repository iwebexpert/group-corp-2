import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import './Navbar.css';

import { ProfileType } from '../../types/types';

import { Link } from "react-router-dom";

type NavbarType = {
  profile?: ProfileType;
};

export const Navbar: React.FC<NavbarType> = ({ profile }) => {
  return(
    <AppBar  position="static" className="navbar">
      <Toolbar className="navbar__toolbar">
        <h1 className="navbar__title">МЕССЕНДЖЕР</h1>
        <Link to={`/chats`} className="link-button">
          <IconButton color="inherit">
            <MessageOutlinedIcon />
          </IconButton>
        </Link>
        {profile &&
          <Link to={`/profile`} className="link-button">
            <IconButton color="inherit">
              <Avatar className="navbar__avatar" src="https://sun9-28.userapi.com/1Q5flJTbLsSbAnuUSrkW71BHBwNbc-v7yN4Kmw/7N2suGQ0XNQ.jpg" />
              <p className="navbar__profile">{profile.name}</p>
            </IconButton>
          </Link>
        }
      </Toolbar>
    </AppBar>
  );
}