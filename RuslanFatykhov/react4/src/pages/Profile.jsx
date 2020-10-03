import React from "react";
import "./Pages.scss";
import avatar from "./avatar.png";

import {
  Typography,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  withStyles,
} from "@material-ui/core";

export function Profile() {
  return (
    <div className="container">
      <Typography variant={"h3"} className="title">
        Мой профиль
      </Typography>
      <Card>
        <CardActionArea className="profile">
          <div className="image">
            <img src={avatar} className="avatar" />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Имя: Руслан
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Возраст: 25
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              О себе: Фронтенд-разработчик из Москвы
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <a href="/" className="back">
        Назад
      </a>
    </div>
  );
};
