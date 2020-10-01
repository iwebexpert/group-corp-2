import React, { Component } from 'react';
import './Root.css'

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import Chat from '../../component/Chat/Chat';
import ChatList from '../../component/ChatList/ChatList';

import { nanoid } from 'nanoid';

export default class Root extends Component {
  state = {
      messagesData: []
  };
  
  handleMessageSend = ({message, author}) => {
    this.setState({ ...this.state, messagesData: [...this.state.messagesData, {id: nanoid(), message: message, author: author ? author : 'Anonymous'}] });
  };

  componentDidUpdate() {
    let elem = document.getElementById('listScroll2');
    elem.scrollTop = elem.scrollHeight;

    if (this.state.messagesData.length%2 == 1) {
      setTimeout(() => {
        this.setState({ ...this.state, messagesData: [...this.state.messagesData, {id: nanoid(), author: "Robot", message: "пора спать..."}] });
      }, 1000);
    }
  }

  render() {
    const chats = [
    //   {
    //   chat_id: 0,
    //   user: {
    //     username: 'qwerty',
    //     avatar: undefined,
    //   }
    // }
  ];
    return(
      <>
        <Container modifiers="container_theme_chat">
          <Navbar />
          <Content modifiers="content_theme_chat">
            <ChatList chats={chats} />
            <Chat modifiers="chat_theme_chat"
                  messagesData={this.state.messagesData}
                  handleMessageSend={this.handleMessageSend} />
          </Content>
        </Container>
      </>
    );
  }
}