import React from 'react'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { profileData } from '../helpers/profileData'
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '1000px'
        // marginLeft: '1000px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export const Profile = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {profileData.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {profileData.nickname}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {profileData.age} years old
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
            <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
    )
}
