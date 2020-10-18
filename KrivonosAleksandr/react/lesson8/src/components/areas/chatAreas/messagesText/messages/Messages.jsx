import React, {Component} from 'react';
import MyMessage from "./messages/messagesTypes/MyMessage";
import CompanionMessage from "./messages/messagesTypes/CompanionMessage";

export const Message = (props) => {

    if (props.msgType === "myMsg") {
        return (
            <MyMessage msg={props}/>
        );
    } else if (props.msgType === "botMsg") {
        return (
            <CompanionMessage msg={props}/>
        );
    }
}