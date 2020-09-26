import React, {Component} from 'react';
import {Markup} from "interweave";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import botImg from "../../../img/user.png";

export class Message extends Component{

    render() {
        if(this.props.msgType === "myMsg") {
            return (
                <div className="message_item myMessage">
                    <div className="message_wrapper">
                        <div className="user_account myMessage_account">
                            <a href="/#" className="date myMessage_date">
                                <FontAwesomeIcon icon={faCalendar}/>
                                {this.props.msgTime}
                            </a>
                        </div>
                        <div className="message_text myMessage_text">
                            <Markup content={this.props.msgText.replace(/\n/g, '<br/>')}/>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.msgType === "botMsg"){
            return (
                <div className="message_item">
                    <div className="message_wrapper">
                        <div className="user_account companionMessage_account">
                            <a href="/#" className="user_account__imgLink">
                                <div className="user_account__img companionMessage_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>

                                </div>
                            </a>
                            <div className="user_wrapper">
                                <a href="/#" className="date companionMessage_date">
                                    <FontAwesomeIcon icon={faCalendar}/>
                                    {this.props.msgTime}
                                </a>
                            </div>
                        </div>
                        <div className="message_text companionMessage_text">
                            <Markup content={this.props.msgText.replace(/\n/g,'<br/>')}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}