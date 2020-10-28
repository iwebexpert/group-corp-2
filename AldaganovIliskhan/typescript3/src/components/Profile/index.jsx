import React from 'react'
import { useSelector } from 'react-redux';
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
    const {profileData} = useSelector(({profile}) => profile);
    const { isProfileError, isProfileLoading } = useSelector(({ profile }) => profile);
    if (isProfileError) {
        return <div style={{ color: '#000' }}>Error...</div>
    }
    if (isProfileLoading) {
        return <div style={{ color: '#000' }}>Loading...</div>
    }
    return (
        <>
            {
                profileData && <Card className={classes.root} variant="outlined" >
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
            }
        </>

    )
}
