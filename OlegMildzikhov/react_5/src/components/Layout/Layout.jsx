import React, {Component} from "react";
import {MessageContainer} from "containers/MessengerContainer";
import ChatAddFormContainer from "../../containers/ChatAddFormContainer"
import {Switch, Route, Link} from 'react-router-dom';
import {Profile} from "components/Chats-profile/Profile";
import "./Layout.css";
import ChatListContainer from "containers/ChatListContainer";
import HeaderContainer from "containers/HeaderContainer";
import {ProfileContainer} from "containers/ProfileContainers";

export class Layouts extends Component {
    constructor(props) {
        super(props);
        this.maxId = 3;
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo () {
        console.log("GET INFO")
        const indexChat = this.props.location.pathname.substring(7);
        console.log("SHIT", indexChat);
        return indexChat;
    }

    render() {
        console.log('LAYOUT', this.props.location.pathname.substring(7));
        return (
            <div className="container">
                <HeaderContainer infoChat = {this.getInfo()}/>
                <div className="chatNmessWrapper">
                    <div className="chats--items">
                        <ChatListContainer/>
                        <ChatAddFormContainer/>
                    </div>
                    <div className={'sfs'}>
                        <Switch>
                            <Route path="/profile" component={ProfileContainer} exact/>
                            <Route path="/chats/:id([0-9]+)" component={MessageContainer} exact/>
                        </Switch>
                    </div>
                </div>
            </div>)
    }
}