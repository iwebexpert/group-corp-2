import React, {Component} from 'react';
import './Message.css'
import classNames from 'classnames';


export class Message extends Component{

    render (){
    const {text, author} = this.props;
    const classes = classNames('message', {
        'message-sender' : author !== 'Robot',
        'message-bot' : author === 'Robot'
    })
        return <div className={classes}>{text} - <b>{author}</b></div>;
    }
}