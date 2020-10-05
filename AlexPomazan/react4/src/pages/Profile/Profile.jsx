import React from "react";
import { Header } from "../../components/Header";
import "./Profile.css";
import manImg from "./../../img/man.png";

import { Card, CardContent, Typography } from "@material-ui/core";

export function Profile() {
  return (
    <>
      <Header />
      <div className="profile-content">
        <Card className="profile-card" variant="outlined">
          <Typography color="textSecondary" gutterBottom>
            Информация о пользователе
          </Typography>
          <CardContent className="profile-card__content">
            <img className="profile-img" src={manImg} alt="" />
            <Typography variant="body2" component="p">
              Имя: Alex
            </Typography>
            <Typography variant="body2" component="p">
              Фамилия: Pomazan
            </Typography>
            <Typography variant="body2" component="p">
              Возраст: 21
            </Typography>
            <Typography variant="body2" component="p">
              Город: Москва
            </Typography>
            <Typography variant="body2" component="p">
              Пол: М
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
