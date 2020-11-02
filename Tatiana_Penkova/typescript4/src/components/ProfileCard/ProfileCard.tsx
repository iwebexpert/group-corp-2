import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import userPhoto from "../../img/leo.jpg";
import FaceIcon from "@material-ui/icons/Face";
import { ProfileCardType, StyleTypes, UseStyleTypes } from "../../types";
import "./ProfileCard.css";

const useStyles: StyleTypes = makeStyles({
    root: {
        minWidth: 275,
        margin: "0 auto"
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
    }
});

export const ProfileCard: React.FC<ProfileCardType> = (props) => {
    const classes: UseStyleTypes = useStyles();
    const { profile, isError, isLoading, handleProfileReload } = props;
    if (isError) {
        return <>
            <div className="error-wrapper error-profile-wrapper">
                <div className="loading-error">
                    <FaceIcon className="error-icon" />
        Ошибка загрузки :(
    <button onClick={handleProfileReload}>Обновить контакты</button>
                </div>
            </div>
        </>
    }

    if (isLoading) {
        return <>
            <div className="loading-container">
                <div className="loadingWrap">
                    <div className="loadingBoxes loadingBoxColour1"></div>
                    <div className="loadingBoxes loadingBoxColour2"></div>
                    <div className="loadingBoxes loadingBoxColour3"></div>
                    <div className="loadingBoxes loadingBoxColour4"></div>
                    <div className="loadingBoxes loadingBoxColour5"></div>
                </div>
            </div>
        </>
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Avatar alt="Leo" src={userPhoto} className="avatar" />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Профиль пользователя:
        </Typography>
                <Typography className="profile-name" variant="h5" component="h2">
                    {profile.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Имя Пользователя: @{profile.nickname}
                </Typography>
                <Typography variant="body2" component="p">
                    Телефон: {profile.tel}
                    <br />
                    Последний визит: {profile.lastVisit}
                </Typography>
            </CardContent>
            <CardActions>
                <Link className="nav-link" to="/"><Button size="small" className="profile-button">Вернуться на главную</Button></Link>
            </CardActions>
        </Card>
    )
};
