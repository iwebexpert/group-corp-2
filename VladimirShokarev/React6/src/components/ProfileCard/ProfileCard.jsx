import React from "react";
import { makeStyles, Card, CardContent, Typography, Avatar} from "@material-ui/core/";
import userPhoto from "../../img/BL.jpg";
import "./ProfileCard.css";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

export function ProfileCard(props) {
    const classes = useStyles();
    const { profile } = props;
    return (
        <Card className={classes.root, "profile-card"}>
            <CardContent>
                <Avatar src={userPhoto} className={classes.large, "avatar"} />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Профиль пользователя:
        </Typography>
                <Typography className="profile-name" variant="h5" component="h2">
                    {profile.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Имя Пользователя: {profile.nickname}
                </Typography>
                <Typography variant="body2" component="p">
                    Телефон: {profile.tel}
                </Typography>
            </CardContent>
        </Card>
    );
}
