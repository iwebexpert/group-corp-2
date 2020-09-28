import React, {Component} from 'react';
import classNames from 'classnames';
import './message.scss';

export class Message extends Component {
  getTimeFormat = () => {
    const time = new Date;
    const hours = time.getHours() < 10 ? '0' + +time.getHours() :  time.getHours();
    const minutes = time.getMinutes() < 10 ? '0' + +time.getMinutes() :  time.getMinutes();
    return `${hours}:${minutes}`;
  }

  render() {
    const {text, author} = this.props;

    const classes = classNames('message', {
      'message-sender': author !== 'Bot',
      'message-bot': author === 'Bot',
    });

    return (
      <div className={classes}>
        {text}<b className="message-author">  {author} {this.getTimeFormat()}</b>
      </div>
    );
  }
}
