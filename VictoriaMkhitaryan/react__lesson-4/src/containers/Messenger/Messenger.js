import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './Messenger.css'

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import Chat from '../../component/Chat/Chat';
import ChatList from '../../component/ChatList/ChatList';
import Card from '@material-ui/core/Card';

import { chats } from '../../helpers/chats';

export default class Messenger extends Component {
  state = {
      chats,
  };
  
  handleMessageSend = (message) => {
    const {chats} = this.state;
    const {match} = this.props;

    const chat = chats[this.props.id];
    message.id = nanoid();
    chat.messages = this.messages.concat([message])

    chats[this.props.id] = chat;

    this.setState({ chats });
  };

  handleAdd = (title) => {
    console.log(title);
    const chat = {
      id: this.state.chats[this.state.chats.length - 1].id + 1,
      title: title,
      messages: [],
    };

    const newChats = [...this.state.chats, chat];
        console.log([...this.state.chats, chat]);
        this.setState({
            chats: newChats,
        });
  };

  componentDidUpdate() {
    console.log(this.messages);
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
    const { chats } = this.state;
    let messages = null;

    if(this.props.id >= 0 && chats[this.props.id]){
        messages = chats[this.props.id].messages;
    }
    return messages;
  }

  render() {
    console.log(this.state);
    
    const { chats } = this.state;
    const messages = this.messages;
    return(
      <>
        <Container modifiers="container_theme_chat">
          <Navbar />
          <Content modifiers="content_theme_chat">
            <ChatList chats={chats}
                      currentChat={this.props.id}
                      handleAdd={this.handleAdd} />
            { messages ?
                          <Chat modifiers="chat_theme_chat"
                                messages={messages}
                                title={chats[this.props.id].title}
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