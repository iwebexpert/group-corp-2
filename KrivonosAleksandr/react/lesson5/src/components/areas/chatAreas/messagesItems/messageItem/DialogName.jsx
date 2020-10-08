import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import botImg from "../../../../../img/user.png";

export class DialogName extends Component{

    render() {
        let lastMsg = '';
        if(this.props.lastMessage.length > 0){
            lastMsg = this.props.lastMessage[this.props.lastMessage.length - 1].text;
        }else{
            lastMsg = 'Начните общение первым';
        }

        return (
            <NavLink to={"/chats/" + this.props.id} className="dialog_link">
                <div className="user_account user_dialog_account">
                    <div className="user_account__imgLink">
                        <div className="user_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>
                        </div>
                    </div>
                    <div className="user_wrapper">
                        <div className="user_account__info">
                            <div className="user_account__infoLink">{this.props.name}</div>
                        </div>
                        <div className="user_account__lastMessage">
                            {lastMsg}
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}