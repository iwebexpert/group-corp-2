import React from 'react';
import pic from "./../img/bot.png";
import man from "./../img/man.png";
import PropTypes from "prop-types";

export const messageType = {
    text: PropTypes.string.isRequired,
};

export const Message = ({ text, author }) => {
    let position = null;
    let img = null;

    if (author === 'BOT') {
        position = 'left';
        img = pic;
    } else {
        position = 'right';
        img = man;
    }

    return (
        <div className={position}>
            <div className="img">
                <img src={img} alt="" />
            </div>
            <div className="text-author">{text} - <b>{author}</b></div>
        </div>
    )
};

Message.propTypes = messageType;
