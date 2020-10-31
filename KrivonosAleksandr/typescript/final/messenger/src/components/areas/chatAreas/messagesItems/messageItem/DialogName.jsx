import React, {Component} from "react";
import {useSelector} from 'react-redux';
import {NavLink} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import botImg from "../../../../../img/user.png";

export const DialogName = (props) => {
    let lastMsg = '';
    if (props.lastMessage.length > 0) {
        lastMsg = props.lastMessage[props.lastMessage.length - 1].text;
    } else {
        lastMsg = 'Начните общение первым';
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
                        {lastMsg}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}
