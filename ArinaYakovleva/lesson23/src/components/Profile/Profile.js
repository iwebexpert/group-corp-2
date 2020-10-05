import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export  function Profile() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Ivan Ivanov"
        subheader="October 5, 2020"
      />
      <CardMedia
        className={classes.media}
        image=''
        title="Nick"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Text me, I'll be glad to answer you
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
      <Button variant="contained" color="secondary">
           <Link to="/">Back</Link>
    </Button>
    </Card>
  );
}
