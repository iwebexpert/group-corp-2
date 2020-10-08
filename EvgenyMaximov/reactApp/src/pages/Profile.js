import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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

export const Profile = (props) => {
  const classes = useStyles();

  const { firstName, secondName, nickName, age } = props.profile;

  return (
    <div className="home-page">
      <Card className={classes.root}>
        <CardContent className={classes.title}>
          <CardMedia
            className={classes.media}
            component="img"
            image="../../src/icons/avatar.ico"
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
      </Card>
    </div>
  );
};
