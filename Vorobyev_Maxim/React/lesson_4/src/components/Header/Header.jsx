import React, {Component} from "react";
import './header.scss';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import {Switch, Route, Link} from 'react-router-dom';

import {Profile} from 'pages/Profile';


export class Header extends Component {
  render() {
    return (
      <div className="headerBlock">
        <div className="chatHeader">
          <Link className="linkItemProfile" to="/profile"><h2>#Profile</h2></Link>
        </div>
        <Switch>
          <Route path="/profile" exact component={Profile} />
        </Switch>
        <div className="searchBlock">
          <PersonOutlineIcon className="personIcon"/>
          <span className="usersOnline">1093</span>
          <input className="inputSearch" type="text" placeholder="Search..."/>
          <SearchIcon className="searchIcon"/>
          <NotificationsIcon className="notificationIcon"/>
          <MenuIcon className="menuIcon"/>
        </div>
      </div>
    );
  }
}