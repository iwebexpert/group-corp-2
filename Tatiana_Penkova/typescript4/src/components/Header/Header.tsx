import React from "react";
import { Link } from "react-router-dom";
import { Avatar, List, ListItem, ListItemText } from "@material-ui/core";
import userPhoto from "../.././img/leo.jpg";
import pic from "../.././img/chat.png";
import "./Header.css";
import { HeaderType } from "../../types";

export const Header: React.FC<HeaderType> = (props) => {
    const { profile, isError, isLoading } = props;

    return (
        <div className="header">
            <List>
                <ListItem>
                    <Link className="nav-link" to="/home"><ListItemText /><img className="home-img" src={pic} alt="logo" /></Link>
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
                    {isError && <ListItemText primary="Ошибка загрузки профиля" />}
                    {isLoading ? <ListItemText primary="Загрузка..." /> :
                        <Link className="nav-link flex-link" to="/profile"> <ListItemText primary={profile.name}
                        /><Avatar alt="Leo" src={isError ? "" : userPhoto}
                            className="avatar-small" /> </Link>
                    }
                </ListItem>
            </List>
        </div >
    )
};