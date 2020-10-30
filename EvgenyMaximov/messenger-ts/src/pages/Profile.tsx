import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Divider,
} from "@material-ui/core";

type ProfilePropsType = {
	profile: ProfileType,
	isLoading: boolean,
	isError: boolean,
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 442,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 200,
    objectFit: "none",
  },
});



export const Profile: React.FC<ProfilePropsType> = ({ profile, isError, isLoading }) => {
  const classes = useStyles();
  const { firstName, secondName, nickName, age } = profile;

  return (
    <div className="home-page">
      <Card className={classes.root}>
        {isError ? <p>Обновите данные...</p> : null}
        {isLoading ? (
          <div className="lds-dual-ring-profile"></div>
        ) : (
          <CardContent className={classes.title}>
            <CardMedia
              className={classes.media}
              component="img"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpY1De7SECL40ftidsXr0ItKdtk-U5LeHTjA&usqp=CAU"
            ></CardMedia>
            <Divider />
            <Typography color="textSecondary" gutterBottom>
              Full Name
            </Typography>
            <Typography variant="h5" component="h2">
              {firstName} {secondName}
            </Typography>
            <Divider />
            <Typography className={classes.pos} color="textSecondary">
              Nickname
            </Typography>
            <Typography variant="h5" component="p">
              {nickName}
            </Typography>
            <Divider />
            <Typography className={classes.pos} color="textSecondary">
              Age
            </Typography>
            <Typography variant="h5" component="p">
              {age}
            </Typography>
            <Divider />
          </CardContent>
        )}
      </Card>
    </div>
  );
};
