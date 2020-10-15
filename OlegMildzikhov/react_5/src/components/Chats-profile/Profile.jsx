import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {MessagesList} from "components/MessageList";
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'


export class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {profile} = this.props;
        console.log(profile);
        return(<>
<h1>Информация о пользователе</h1>
            <Card>
                <CardContent>
                    <Typography component={'span'} color="textSecondary" gutterBottom>
                       <h2>Информация о пользователе</h2>
                    </Typography>
                    <Typography variant="h5"component={'span'}>
                        <p>{profile.name}</p>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>{profile.lastName}</p>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>Возраст: {profile.age}</p>
                    </Typography>
                    {profile.photo !=='none' ?  <CardMedia
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    /> : <p>Фото отсутствует</p>}
                </CardContent>

            </Card>
            </>
        )
    }
}

