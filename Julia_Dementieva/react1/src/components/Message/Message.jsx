import React, { Component } from 'react'

import classNames from 'classnames';

import './Message.scss';

export class Message extends Component {
    
    render(){
        const {text, author} = this.props;

        const classes = classNames('message', {
            'message-sender': author !== 'Robot',
            'message-bot': author === 'Robot',
        });

        return (
            <div className={classes}>
                <ul>
                    <li  key={text}>{text} - <b className="message-author">{author}</b></li>
                </ul>
            </div>
        )
    }
}
