import React from "react";
import PropTypes from "prop-types";
import { Message, messageType } from "../Message";

export const MessagesList = (props) => {
    const { handleDeleteMessage } = props;
    return props.items.map((item) => (<Message handleDeleteMessage={handleDeleteMessage} text={item.text} author={item.author} key={item.id} />));
};

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType),
    ),
};