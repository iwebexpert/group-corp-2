import React, { Component } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { ListItemText } from "@material-ui/core";

import "./Header.css";

export class Header extends Component {
  render() {
    const {
      profile,
      handleClick,
      isError,
      isLoading,
      handleChatsReload,
    } = this.props;

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
              {isError ? (
                <ListItemText primary="Ошибка загрузки профиля" />
              ) : null}
              {isLoading ? (
                <ListItemText primary="Загрузка..." />
              ) : (
                <Link className="right-link__item" to="/profile">
                  <div className="profile-link">
                    <img className="user-img" src={profile.img} alt="" />
                    <p>Ваш профиль, {profile.firstName} </p>
                  </div>
                </Link>
              )}
            </li>
          </div>
        </nav>
      </header>
    );
  }
}
