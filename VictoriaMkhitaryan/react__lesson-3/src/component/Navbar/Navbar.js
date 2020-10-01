import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './Navbar.css';

export default function Navbar(props) {
  return(
    <AppBar  position="static" className="navbar">
      <Toolbar className="navbar__toolbar">
        <h1 className="navbar__title">МЕССЕНДЖЕР</h1>
      </Toolbar>
    </AppBar>
  );
}