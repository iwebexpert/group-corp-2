import React, {Component} from 'react';
import {chats} from "components/Chats-data/ChatData";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {MessagesList} from "components/MessageList";
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
//
//     return (
//         <Card className={classes.root}>
//             <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                     Word of the Day
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                     be{bull}nev{bull}o{bull}lent
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                     adjective
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                     well meaning and kindly.
//                     <br />
//                     {'"a benevolent smile"'}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Button size="small">Learn More</Button>
//             </CardActions>
//         </Card>
//     );
// }

export class Profile extends Component {

    render() {
        const {firstName, lastName, age, photo} = this.props.name;
        console.log(this.props);
        // const {chats} = this.state;
        // const {match} = this.props;
        // let title = match.params.title;
        // let index = chats.findIndex(elem => elem.title === title);
        // let info = chats[index].info[0];
        // const {firstName, lastName, age, photo} = info;
        //
        // console.log(info);

        return(
            // <BrowserRouter>
            //     <h1>Hi!</h1>
            // </BrowserRouter>

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


// import React, {Component} from 'react';
// import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
// import {MessagesList} from "../MessageList/";
// import {MessageForm} from "../MessageForm";
// import {chats} from '../Chats-data/ChatData';
// // import {Profile} from '../Chats-profile/profile'
// // import './Messenger.css';
// import ListItemText from "@material-ui/core/ListItemText";
//
// export class Profile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             chats,
//         };
//     }
//
//     get bio() {
//         const {chats} = this.state;
//         const {match} = this.props;
//         console.log([match.params.id]);
//         let bios = null;
//
//         if (match && chats[match.params.id]) {
//             bios = chats[match.params.id].info;
//         }
//         return bios;
//     }
//
//     render() {
//         const messages = this.messages;
//         const author = this.author;
//         const {match} = this.props;
//         const {chats, header} = this.state;
//         console.log(author, messages);
//         return (<BrowserRouter>
//
//                 <div className={"messenger"}>
//
//                     <div className="messages-list">
//                         {messages ? <MessagesList items={messages}/> : <div>Выберите чат слева</div>}
//                     </div>
//                     {messages && <MessageForm onSend={this.handleMessageSend}/>}
//                 </div>
//             </BrowserRouter>
//         )
//     }
// }