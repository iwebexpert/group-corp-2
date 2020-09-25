import React from 'react';
import { Message, messageType } from './Message.jsx';
import PropTypes from "prop-types";

export const MessagesList = ({ items }) => {
    return (
        < div className="text" >
            {items.map((item, index) => (<Message text={item.text} author={item.person} key={index} />))}
        </div >
    )
};

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType),
    ),
};
