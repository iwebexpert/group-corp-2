import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import userPhoto from "../../img/leo.jpg";
import pic from "../../img/chat.png";
import "./Header.css";

export class Header extends Component {
    render() {
        const { profile, handleClick, isError, isLoading } = this.props;
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
                        <div className="about" onClick={handleClick}>О нас</div>
                    </ListItem>
                    <ListItem>
                        <Link className="nav-link" to="/pagenotfount"><ListItemText primary="Страница с ошибкой" /></Link>
                    </ListItem>
                    <ListItem >
                        <Link className="nav-link" to="/profile"><ListItemText primary="Профиль" /> </Link>
                    </ListItem>
                    <ListItem >
                        {isError ? <ListItemText primary="Ошибка загрузки профиля" /> :
                            null
                        }
                        {isLoading ? <ListItemText primary="Загрузка..." /> :
                            <Link className="nav-link flex-link" to="/profile"> <ListItemText primary={profile.name} /><Avatar alt="Leo" src={isError ? null : userPhoto} className="avatar-small" /> </Link>
                        }
                    </ListItem>
                </List>
            </div >
        )
    }
};