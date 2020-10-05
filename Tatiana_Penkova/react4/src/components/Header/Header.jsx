import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import userPhoto from "../../img/leo.jpg";
import pic from "../../img/chat.png";
import "./Header.css";

export class Header extends Component {

    render() {
        return (
            <div className="header">
                <List>
                    <ListItem>
                        <Link className="nav-link" to="/home"><ListItemText /><img className="home-img" src={pic} /></Link>
                    </ListItem>
                    <ListItem>
                        <Link className="nav-link" to="/chats/123"><ListItemText primary="Чаты" /></Link>
                    </ListItem>
                    <ListItem>
                        <Link className="nav-link" to="/about"><ListItemText primary="О нас" /></Link>
                    </ListItem>
                    <ListItem>
                        <Link className="nav-link" to="/pagenotfount"><ListItemText primary="Страница с ошибкой" /></Link>
                    </ListItem>
                    <ListItem >
                        <Link className="nav-link" to="/profile"><ListItemText primary="Профиль" /> </Link>
                    </ListItem>
                    <ListItem >
                        <Link className="nav-link" to="/profile"><Avatar alt="Leo" src={userPhoto} className="avatar-small" /></Link>
                    </ListItem>
                </List>
            </div>
        )
    }
}