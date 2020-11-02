import React from 'react';

import classNames from 'classnames';
import {MessageType} from '../../types/types';
import './Message.scss';

export const Message: React.FC<MessageType> = ({text, author}) => {

    const classes = classNames('message', {
        'message-sender': author !== 'Robot',
        'message-bot': author === 'Robot',
    });

    return (
        <div className={classes}>
            <ul>
                <li  key={text} style={{listStyleType: "none"}}>{text} - <b className="message-author">{author}</b></li>
            </ul>
        </div>
    );
}
