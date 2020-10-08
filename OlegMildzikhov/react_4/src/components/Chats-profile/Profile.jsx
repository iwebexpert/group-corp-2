import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class Profile extends Component {

    render() {
        const {firstName, lastName, age, photo} = this.props.name;
        console.log(this.props);
        return(
            <Card>
                <CardContent>
                    <Typography component={'span'} color="textSecondary" gutterBottom>
                       <h2>Информация о пользователе</h2>
                    </Typography>
                    <Typography variant="h5"component={'span'}>
                        <p>{firstName}</p>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>{lastName}</p>
                    </Typography>
                    <Typography variant="h5" component={'span'}>
                        <p>Возраст: {age}</p>
                    </Typography>
                    {photo !=='none' ?  <CardMedia
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    /> : <p>Фото отсутствует</p>}
                </CardContent>
            
            </Card>
        )
    }
}