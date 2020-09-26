import React from 'react';
import PropTypes from 'prop-types';

export const messageType = {
    text: PropTypes.string.isRequired,
};

export const Message = ({ text, author }) => {
    return <div> Сообщение : {text} - Автор : <b>{author}</b></div>;
};

Message.propTypes = messageType;