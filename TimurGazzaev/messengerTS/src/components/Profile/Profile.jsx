import React from 'react'
import {Card, CardActionArea, CardMedia, CardContent, Typography} from "@material-ui/core"
import user from '../../assets/user.png'
import {makeStyles} from "@material-ui/core/styles"
import {Preloader} from "../Preloader/Preloader";

export const useStyles = makeStyles((theme) => ({
    profileCart: {
        margin: '100px auto',
        width: 300,
    },
    info: {
        marginTop: 32
    },
    infoValue: {
        fontWeight: "bold"
    }
}))

export const Profile = ({data, isLoading}) => {
    const classes = useStyles()

    if(isLoading) {
        return <Preloader/>
    }

    return (
        <div className="profile">
            <Card className={classes.profileCart}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="user"
                        height="140"
                        image={user}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{`${data.name} ${data.surName}`}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{data.status}</Typography>
                        <div className={classes.info}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Age
                                <Typography component="b" className={classes.infoValue}>{` ${data.age}`}</Typography>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lives in
                                <Typography component="b" className={classes.infoValue}>{` ${data.city}`}</Typography>
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
