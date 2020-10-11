import React, {Component} from "react";
import {chats} from '../Chats-data/ChatData';
import "./Messenger-Header.css"
import ListItem from "@material-ui/core/ListItem";
import {Link, Route, Switch} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {Messenger} from "components/Messenger";
import {Profile} from "components/Chats-profile/Profile";

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats,
        };
        this.showInfoAboutFriend = this.showInfoAboutFriend.bind(this);
    }

    showInfoAboutFriend() {
        // const {firstName, lastName, age, photo} = this.props.userInfo;
        // console.log(firstName, lastName, age, photo);
        // const {chats} = this.state;
        // // const {match} = this.props;
        // let title = +this.props.location.pathname.substring(7);
        // // console.log('layouts', this.props.location.pathname.substring(7));
        // console.log(chats[title].info[0]);
        // // let index = chats.findIndex(elem => elem.id === title);
        // let info = chats[title].info[0];
    }

    render() {
        console.log(this.props)
        if(this.props.takeInfo){
            return (
                <div className="header">
                    <h1>Oleg Mild</h1>
                    <Link to={`/profile/${this.props.takeInfo.info[0].userId}`}>
                        <p onClick={this.showInfoAboutFriend}>Профиль друга</p>
                    </Link>
                    <h2>5 активных чатов, непрочитанных сообщений 3</h2>
                    </div>
            );
        }
        // console.log(this.props.takeInfo.info[0].userId);
        // const {match} = this.props;
        // const infoAbFriend = this.props.showInfo;
        // const {userId} = infoAbFriend;
        // const {title} = this.props.infoAbUs
        // console.log('header match', match, this.props);
        return (
            <div className="header">
                <h1>Oleg Mild</h1>
                <h2>Выбери чат!</h2>
                </div>
        );
    }
}