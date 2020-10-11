import React, { Component } from 'react';
import { Message, messageType } from '../Message';
import './messagesList.scss';

export class MessagesList extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        {/* <div className="messagesListBlock"> */}
          {this.props.items.map((item) => (<Message {...item} key={item.id}/>))}
        {/* </div> */}
      </>
    );
  }
}