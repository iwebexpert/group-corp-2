import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import botImg from "../../../../../img/user.png";

export class DialogName extends Component{
    image = {background: 'url(' + this.props.image + ') top/cover no-repeat'};

    render() {
        return (
            <NavLink to={"/" + this.props.id} className="dialog_link">
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
                            {this.props.lastMessage}
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}