import React, { Component } from "react";

import { Link } from "react-router-dom";

import { ListItemText } from "@material-ui/core";

import "./Header.css";

export class Header extends Component {
  render() {
    const { profile } = this.props;
    return (
      <header>
        <nav>
          <div className="left-link">
            <li>
              <Link className="left-link__item" to="/">
                <ListItemText primary="Messenger" />
              </Link>
            </li>
          </div>
          <div className="right-link">
            <li>
              <Link className="right-link__item" to="/profile">
                <div className="profile-link">
                  <img className="user-img" src={profile.img} alt="" />
                  <p>Ваш профиль, {profile.firstName} </p>
                </div>
              </Link>
            </li>
          </div>
        </nav>
      </header>
    );
  }
}
