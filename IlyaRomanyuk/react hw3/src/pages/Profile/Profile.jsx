import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 1000,
    },
    media: {
        height: 400,
    },
});

export const Profile = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://petapixel.com/assets/uploads/2019/06/manipulatedelephant-800x534.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Rafael Ramaisen
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Veniam nihil ab, ea soluta consequatur ipsum aliquid laudantium veritatis aliquam.
                        Atque, necessitatibus rem dolor nesciunt dolorem eos iusto inventore molestiae quas!
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
    );
}