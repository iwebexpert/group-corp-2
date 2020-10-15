import React from "react";
import { HeaderContainer } from "../../containers/HeaderContainer";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Profile.css";

export function Profile(props) {
  const { profile, isError, isLoading, handleProfileReload } = props;
  if (isError) {
    return (
      <div>
        Error... <button onClick={handleProfileReload}>Обновить профиль</button>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <HeaderContainer />
      <div className="profile-content">
        <Card className="profile-card" variant="outlined">
          <Typography color="textSecondary" gutterBottom>
            Информация о пользователе
          </Typography>
          <CardContent className="profile-card__content">
            <img className="profile-img" src={profile.img} alt="" />
            <Typography variant="body2" component="p">
              Имя: {profile.firstName}
            </Typography>
            <Typography variant="body2" component="p">
              Фамилия: {profile.lastName}
            </Typography>
            <Typography variant="body2" component="p">
              Возраст: {profile.age}
            </Typography>
            <Typography variant="body2" component="p">
              Город: {profile.city}
            </Typography>
            <Typography variant="body2" component="p">
              Пол: {profile.gender}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
