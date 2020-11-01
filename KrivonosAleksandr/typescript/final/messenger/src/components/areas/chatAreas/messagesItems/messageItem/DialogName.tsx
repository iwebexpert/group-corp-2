import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import botImg from "../../../../../img/user.png";

type DialogNameType = {
    id: string;
    name: string;
    fire: boolean;
    lastMessage: messagePayload[] | undefined;
    key: string;
}

export const DialogName: React.FC<DialogNameType> = (props) => {
    // let lastMsg: string = '';
    let lastMsg = {
        text: ""
    }
    if (props.lastMessage && props.lastMessage.length > 0) {
        lastMsg.text = props.lastMessage[props.lastMessage.length - 1].text;
        // lastMsg = props.lastMessage;
    } else {
        lastMsg.text = 'Начните общение первым';
    }

    return (
        <NavLink to={"/chats/" + props.id} className="dialog_link">
            <div className="user_account user_dialog_account">
                <div className="user_account__imgLink">
                    <div className="user_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>
                    </div>
                </div>
                <div className="user_wrapper">
                    <div className="user_account__info">
                        <div className="user_account__infoLink">{props.name}</div>
                    </div>
                    <div className="user_account__lastMessage"
                         style={props.fire ? {background: "transparent"} : {background: "#9addfb"}}>
                        {lastMsg.text}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}
