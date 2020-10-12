import React from 'react'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '300px'
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
export const Profile = ({ profileData }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {profileData ? profileData.name : 'Ivanov Ivan'}
                </Typography>
                <Typography variant="h5" component="h2">
                    {profileData ? profileData.nickname : 'gagskaya'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {profileData ? profileData.age : '100'} years old
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