import React, {Component} from "react";
import './header.scss';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import {Switch, Route, Link} from 'react-router-dom';
import { ProfileContainer } from "containers/ProfileContainer";
import { Profile } from "../Profile";


export class Header extends Component {
  reg = /([^\/]+$)/;
  render() {
    return (
      <div className="headerBlock">
        <div className="chatHeader">
          <Link className="linkItemProfile" to="/profile"><h2>#Profile</h2></Link>
        </div>
        <Switch>
          <Route path="/profile" exact component={Profile} />
          <Route path="/" component={ProfileContainer} />
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