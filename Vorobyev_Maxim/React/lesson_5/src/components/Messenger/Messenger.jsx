import React, { Component } from 'react';
import { MessagesList } from '../MessagesList';
import { MessageForm } from '../MessageForm';

import './Messenger.scss';

export class Messenger extends Component {
  render() {
    const { messages, handleMessageSend } = this.props;
    return (
      <>
      <div className="messanger">
        {messages ? <MessagesList items={messages}/> : <div сlassName="choose">Выберите чат</div>}
      </div>
      <div>
        <hr/>
        <div className="messageFormBlock">{messages && <MessageForm  onSend={handleMessageSend} />}</div>
      </div>  
      </>
    );
  }
}