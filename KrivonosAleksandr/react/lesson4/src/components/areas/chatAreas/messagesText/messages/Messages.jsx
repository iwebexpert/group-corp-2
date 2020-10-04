import React, {Component} from 'react';
import MyMessage from "./messages/messagesTypes/MyMessage";
import CompanionMessage from "./messages/messagesTypes/CompanionMessage";

export class Message extends Component{

    render() {
        if(this.props.msgType === "myMsg") {
            return (
                <MyMessage msg={this.props}/>
            );
        } else if (this.props.msgType === "botMsg"){
            return (
                <CompanionMessage msg={this.props}/>
            );
        }
    }
}