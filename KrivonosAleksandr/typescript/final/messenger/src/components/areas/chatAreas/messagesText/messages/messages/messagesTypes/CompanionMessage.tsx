import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {Markup} from "interweave";
import botImg from "../../../../../../../img/user.png";
import {Link} from "react-router-dom";

const CompanionMessage = (props) => {
    return(
        <div className="message_item">
            <div className="message_wrapper">
                <div className="user_account companionMessage_account">
                    <Link to="/profile" className="user_account__imgLink">
                        <div className="user_account__img companionMessage_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>

                        </div>
                    </Link>
                    <div className="user_wrapper">
                        <Link to="/chats/new" className="date companionMessage_date">
                            <FontAwesomeIcon icon={faCalendar}/>
                            {props.msg.msgTime}
                        </Link>
                    </div>
                </div>
                <div className="message_text companionMessage_text">
                    <Markup content={props.msg.msgText.replace(/\n/g,'<br/>')}/>
                </div>
            </div>
        </div>
    );
}

export default CompanionMessage;