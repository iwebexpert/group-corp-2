import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";

import "./Header.css";

export class Header extends Component {
  render() {
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
                <ListItemText primary="Профиль" />
              </Link>
            </li>
          </div>
        </nav>

        {/* <List className="nav">
          <ListItem>
            <Link className="header-links" to="/">
              <ListItemText primary="Messenger" />
            </Link>
          </ListItem>
          <ListItem>
            <Link className="header-links" to="/about">
              <ListItemText primary="О нас" />
            </Link>
          </ListItem>
          <ListItem>
            <Link className="header-links" to="/pagenotfount">
              <ListItemText primary="Страница с ошибкой" />
            </Link>
          </ListItem>
        </List> */}
      </header>
    );
  }
}
