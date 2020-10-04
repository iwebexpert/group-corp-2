import React, {Component} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';
import './messenger.css';
import {nanoid} from "nanoid";
import {chats} from '../../helpers/chatsData';


export class Messenger extends Component {
  state = {
    chats,
  };

  getTimeFormat = () => {
    const time = new Date;
    const hours = time.getHours() < 10 ? '0' + +time.getHours() :  time.getHours();
    const minutes = time.getMinutes() < 10 ? '0' + +time.getMinutes() :  time.getMinutes();
    return `${hours}:${minutes}`;
  }

  get messages() {
    const {chats} = this.state;
    const {match} = this.props;
    let messages = '';
    if (match && chats[match.params.id]) {
      messages = chats[match.params.id].messages;
    }
    return messages;
  }

  handleMessageSend = (message) => {
    console.log(this.props);
    const {chats} = this.state;
    const {match} = this.props;
    message.id = nanoid();
    const chat = chats[match.params.id];
    message.time = this.getTimeFormat();
    chat.messages = this.messages.concat([message]);
    chats[match.params.id] = chat;
    //message.audio = 
    this.setState({
      chats: {
        ...chats,
        time: message.time,
      },
    });
  };

  componentDidUpdate() {
    if (this.messages.length) {
      setTimeout(() => {
        const {author} = this.messages[this.messages.length - 1];
        if (author !== 'Bot') {
          this.handleMessageSend({text: `Привет, ${author}. Как дела?`, author: 'Bot'});
        }
      }, 300);
    }
  }

  render() {
    const messages = this.messages;
    return (
      <div className="messenger">
        {messages ? <div className="messages-list"><MessagesList items={messages}/></div> : <div className="choose">Выбирете чат</div>}
        {messages && <MessageForm onSend={this.handleMessageSend}/>}
      </div>
    );
  }
}