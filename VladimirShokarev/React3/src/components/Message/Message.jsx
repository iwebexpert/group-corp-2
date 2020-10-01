import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Message.scss';

export const messageType = {
    text: PropTypes.string.isRequired,
};

export class Message extends React.Component {
    static propTypes = messageType;

    // get direction(){
    //     return this.props.author === 'Bot' ? 'start' : 'end';
    // }

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
