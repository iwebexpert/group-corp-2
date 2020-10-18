import React from 'react';
import './Message.css'
import classNames from 'classnames';

export const Message = (props) => {
    const {text, author} = props;
    const classes = classNames('message', {
        'message-sender' : author !== 'Robot',
        'message-bot' : author === 'Robot'
    })
    return <div className={classes}>{text} - <b>{author}</b></div>;
}