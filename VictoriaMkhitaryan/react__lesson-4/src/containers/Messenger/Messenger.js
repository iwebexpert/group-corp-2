import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './Messenger.css'

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import Chat from '../../component/Chat/Chat';
import ChatList from '../../component/ChatList/ChatList';
import Card from '@material-ui/core/Card';

export default class Messenger extends Component {
  handleMessageSend = (message) => {
    if (typeof(this.props.messageSend === 'function'))
      this.props.messageSend(this.props.id, message);
  };

  handleChatAdd = (chat) => {
    if (chat) {
        if (typeof (this.props.addChat) === 'function'){
            this.props.addChat(chat);
        }
    }
}

  componentDidUpdate() {
    console.log(this.message);
    if(this.messages.length){
      const { author } = this.messages[this.messages.length - 1];
      if (author != 'Robot'){
        setTimeout(() => {
          this.handleMessageSend({ message: `Hi, ${ author }! Это Robot...`, author: 'Robot' });
        }, 1000);
      }
    }
  }

  get messages(){
    const { chats, id } = this.props;
    let messages = null;

    if(id >= 0 && chats[id]){
        messages = chats[id].messages;
    }
    return messages;
  }

  render() {
    const { chats, id } = this.props;
    const messages = this.messages;
    console.log(chats);
    return(
      <>
        <Container modifiers="container_theme_chat">
          <Navbar />
          <Content modifiers="content_theme_chat">
            <ChatList chats={chats}
                      currentChat={id}
                      handleAdd={this.handleChatAdd} />
            { messages ?
                          <Chat modifiers="chat_theme_chat"
                                messages={messages}
                                title={chats[id].title}
                                author={this.props.person.name}
                                handleMessageSend={this.handleMessageSend} />
                      : 
                          <Card className="chat__card-warn">
                            <h4 className="chat__warn">Выбери чат</h4>
                            <img src={'/static/img/chat.png'} className="chat__image"/>
                          </Card>
            }
          </Content>
        </Container>
      </>
    );
  }
}