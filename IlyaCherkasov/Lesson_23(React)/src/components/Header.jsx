import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>Messanger App</h1>
      </Link>
      <List>
        <ListItem>
          <Link to="/">
            <ListItemText primary="Главная" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/about">
            <ListItemText primary="О нас" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/pagenotfound">
            <ListItemText primary="Страница с ошибкой" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/profile">
            <ListItemText primary="Мой профиль" />
          </Link>
        </ListItem>
      </List>
    </header>
  );
};

export default Header;
