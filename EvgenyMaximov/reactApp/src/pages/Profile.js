import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

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

export const Profile = () => {
  const classes = useStyles();

  return (
    <div className="home-page">
      <Card className={classes.root}>
        <CardContent className={classes.title}>
          <CardMedia
            className={classes.media}
            component="img"
            image="../../src/icons/avatar.ico"
          ></CardMedia>
          <Typography color="textSecondary" gutterBottom>
            User full name
          </Typography>
          <Typography variant="h5" component="h2">
            Maximov Evgeny
          </Typography>
          <br />
          <Typography className={classes.pos} color="textSecondary">
            Nickname
          </Typography>
          <Typography variant="h5" component="p">
            Areukiddin
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
