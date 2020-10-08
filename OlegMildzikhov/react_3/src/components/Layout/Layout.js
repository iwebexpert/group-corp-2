import React, {Component} from "react";
import {Header} from "../Messenger-Header/index";
import {Messenger} from "../Messenger/index";
import {ChatList} from "../Chat-list";
import "./Layout.css"
export  class Layouts extends Component {
    render() {
        return (<div className="container">
            <Header/>
            <div className="wrapper">
            <ChatList className="chat-list"/>
            <Messenger className="messenger"/>
            </div>
            </div>)
    }
}