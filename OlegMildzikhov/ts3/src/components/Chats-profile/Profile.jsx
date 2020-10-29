import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export const Profile = (props) => {

    const {profile} = props;

    return (<>
            <h1>Информация о пользователе</h1>
            <Card>
                <CardContent>
                    <Typography component={'span'} color="textSecondary" gutterBottom>
                        <h2>Информация о пользователе</h2>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>{profile.name}</p>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>{profile.lastName}</p>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>Возраст: {profile.age}</p>
                    </Typography>
                    {profile.photo !== 'none' ? <CardMedia
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    /> : <p>Фото отсутствует</p>}
                </CardContent>

            </Card>
        </>
    )
}
