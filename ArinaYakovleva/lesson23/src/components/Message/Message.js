import React, {Component} from 'react';
import './Message.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const messageType = {
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export class Message extends Component{

    render(){
        const {message, author} = this.props;
        const classes = classNames('text', {
            'message-sender': author !== 'Bot',
            'message-bot': author === 'Bot',
        });

        return(
            <div className={classes} >
              <p className="item-text"> {message} - <b className="message-author">{author}</b> </p>
            </div>
        );
    }
}

Message.propTypes = messageType;