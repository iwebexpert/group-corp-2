import React, {Component} from 'react';
import classNames from 'classnames';
import './message.scss';
import {AudioMessage} from '../AudioMessage';

export class Message extends Component {
  audio = false;

  render() {
    const {text, author, time, audio} = this.props;
    const classes = classNames('message', {
      'message-sender': author !== 'Bot',
      'message-bot': author === 'Bot',
    });
    return (
      <div className={classes}>
        {text}<b className="message-author"> {author} {time}</b>
      </div>
    );
  }
}
