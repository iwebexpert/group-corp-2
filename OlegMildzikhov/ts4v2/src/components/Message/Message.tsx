import React from 'react';
import classNames from 'classnames';

import './Message.scss';

export class Message extends React.Component<MesageType> {
    render(){
        const {text, author} = this.props;

        const classes = classNames('message', {
            'message-sender': author !== 'Bot',
            'message-bot': author === 'Bot',
        });

        return <div className={classes}>
            {text} - <b className="message-author">{author}</b>
            </div>;
    }
}
