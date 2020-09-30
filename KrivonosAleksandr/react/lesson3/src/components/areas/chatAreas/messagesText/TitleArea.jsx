import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import botImg from "../../../../img/user.png";

export class TitleArea extends Component{
    render(){
        return(
            <div className="chat_messages_title">
                <div className="chat_messages_title__text">
                    <div className="user_account">
                        <a href="/#" className="user_account__imgLink">
                            <div className="user_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>

                            </div>
                        </a>
                        <div className="user_account__info">
                            <a href="/#" className="user_account__infoLink">Father Bot</a>
                            <div className="state state_online">
                                <FontAwesomeIcon icon={faCircle}/>
                                Online
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat_messages_title__settings">
                    <a href="/#" className="chat_messages_title__settingsIcon icon_template"><FontAwesomeIcon icon={faCogs}/></a>
                </div>
            </div>
        );
    }
}