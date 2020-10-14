import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import avatar from "./avatar.png";

import {
  Typography,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  },
  profile: {
    margin: "50px auto",
  },
  avatar: {
    width: "200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
  },
  back: {
    backgroundColor: "#3498db",
    padding: "10px 20px",
    textDecoration: "none",
    color: "white",
    borderRadius: "15px",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginTop: "10px",
  },
});

export const Profile = ({ name, age, job, github }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant={"h3"} className={classes.title}>
        Мой профиль
      </Typography>
      <Card className={classes.profile}>
        <CardActionArea>
          <div className={classes.image}>
            <img src={avatar} className={classes.avatar} />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.item}
            >
              Имя: {name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.item}
            >
              Возраст: {age}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.item}
            >
              Профессия: {job}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.item}
            >
              GitHub: <a href={github}>{github}</a>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Link to="/" className={classes.back}>
        Назад
      </Link>
    </div>
  );
};
