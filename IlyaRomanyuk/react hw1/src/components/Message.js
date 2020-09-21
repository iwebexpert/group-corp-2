import React from 'react';

const Message = ({ text, author }) => {
    return <div>{text} - <b>{author}</b></div>;
};

export default Message;
