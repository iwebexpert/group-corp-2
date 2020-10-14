import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";
import "./Header.css";

export class Header extends Component {

    render() {
        return (
            <div className="header">
                <List>
                    <ListItem>
                        <Link className="nav-link" to="/chats/123">Чаты</Link>
                    </ListItem>
                    <ListItem>
                        <Link className="nav-link" to="/about">О нас</Link>
                    </ListItem>
                    <ListItem>
                        <Link className="nav-link" to="/pagenotfount">Страница с ошибкой</Link>
                    </ListItem>
                    <ListItem >
                        <Link className="nav-link" to="/profile">Профиль </Link>
                    </ListItem>
                </List>
            </div>
        )
    }
}