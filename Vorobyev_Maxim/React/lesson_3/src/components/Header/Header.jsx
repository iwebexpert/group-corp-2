import React, {Component} from "react";
import './header.scss';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';


export class Header extends Component {
  render() {
    return (
      <div className="headerBlock">
        <div className="chatHeader">
          <h2>#CurrentChat</h2>
          <StarBorderIcon className="starIcon"/>
        </div>
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