import React from "react";
import { Link } from "react-router-dom";
import { ListItemText } from "@material-ui/core";

import "./Header.css";

export const Header = (props) => {
  const { profile, isError, isLoading } = props;
  return (
    <header>
      <nav>
        <div className="left-link">
          <li>
            <Link className="left-link__item" to="/">
              <ListItemText primary="Мессенджер" />
            </Link>
          </li>
        </div>
        <div className="right-link">
          <li>
            {isError && <ListItemText primary="Ошибка загрузки профиля" />}
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
