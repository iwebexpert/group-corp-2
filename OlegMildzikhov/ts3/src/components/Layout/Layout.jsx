import React from "react";
import {MessageContainer} from "../../containers/MessengerContainer";
import ChatAddFormContainer from "../../containers/ChatAddFormContainer"
import {Switch, Route} from 'react-router-dom';
import "./Layout.css";
import ChatListContainer from "../../containers/ChatListContainer";
import HeaderContainer from "../../containers/HeaderContainer";
import {ProfileContainer} from "../../containers/ProfileContainers";

export const Layouts = (props) => {

  const getInfo = () => {
        console.log("GET INFO")
        const indexChat = props.location.pathname.substring(7);
        console.log("SHIT", indexChat);
        return indexChat;
    }

    return (
        <div className="container">
            <HeaderContainer infoChat = {getInfo()}/>
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