import React from 'react';
import './ProfilePage.scss';
import { Typography, Card, CardContent, CardMedia, Hidden, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginTop: 8,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const ProfilePage = ({ user }) => {
  const classes = useStyles();
  const { card, cardDetails, cardMedia } = classes;

  const accountInfo =  {
    username: user,
    date: new Date().toLocaleString(),
    description:
      '23 y.o. designer from San Fransisco',
    image: 'https://source.unsplash.com/random',
  };

  const { username, date, description, image } = accountInfo;

  return (
    <Card className={card}>
      <div className={cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {description}
          </Typography>
        </CardContent>
      </div>
      <Hidden xsDown>
        <CardMedia className={cardMedia} image={image} />
      </Hidden>
    </Card>
  );
};

export default ProfilePage;