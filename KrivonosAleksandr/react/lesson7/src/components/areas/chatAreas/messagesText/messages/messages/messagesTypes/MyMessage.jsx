import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {Markup} from "interweave";
import {Link} from "react-router-dom";

const MyMessage = (props) => {
    return(
        <div className="message_item myMessage">
            <div className="message_wrapper">
                <div className="user_account myMessage_account">
                    <Link to="/" className="date myMessage_date">
                        <FontAwesomeIcon icon={faCalendar}/>
                        {props.msg.msgTime}
                    </Link>
                </div>
                <div className="message_text myMessage_text">
                    <Markup content={props.msg.msgText.replace(/\n/g, '<br/>')}/>
                </div>
            </div>
        </div>
    );
}

export default MyMessage;