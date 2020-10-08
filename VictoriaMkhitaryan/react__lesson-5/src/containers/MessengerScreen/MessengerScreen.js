import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './MessengerScreen.css'

import * as messengerActions from '../../store/messenger/actions';
import * as messengerSelectors from '../../store/messenger/reducer';

import { chatsLoad, messageSend } from '../../store/messenger/actions';

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import Chat from '../../component/Chat/Chat';
import ChatList from '../../component/ChatList/ChatList';
import Card from '@material-ui/core/Card';

class MessengerScreen extends Component {
  handleMessageSend = (message) => {
    // if (typeof(this.props.messageSend === 'function'))
    //   this.props.messageSend(this.props.id, message);

    const chatId = this.props.id;
    message.id = nanoid();
    this.props.messageSend({ ...message, chatId });
  };

  handleChatAdd = (chat) => {
    if (chat) {
        if (typeof (this.props.addChat) === 'function'){
            this.props.addChat(chat);
        }
    }
  }

  // componentDidUpdate() {
  //   console.log(this.message);
  //   if(this.messages.length){
  //     const { author } = this.messages[this.messages.length - 1];
  //     if (author != 'Robot'){
  //       setTimeout(() => {
  //         this.handleMessageSend({ message: `Hi, ${ author }! Это Robot...`, author: 'Robot' });
  //       }, 1000);
  //     }
  //   }
  // }

  componentDidMount() {
    this.props.chatsLoad();
    console.log("(((1111))))", this.props.chats);
  }

  // get messages(){
  //   const { id } = this.props;
  //   const chats = this.props.chats;
  //   let messages = null;

  //   if(id >= 0 && chats[id]){
  //       messages = chats[id].messages;
  //   }
  //   return messages;
  // }

  render() {
    const { id } = this.props;
    const chats = this.props.chats;
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

function mapStateToProps(state, ownProps){
  const chats = state.chats.entries;
  const {match} = ownProps;

  let messages = null;

  if(match && chats[match.params.id]){
      messages = chats[match.params.id].messages;
  }
  
  return {
      messages,
      chatId: match ? match.params.id: null,
  };
}

function mapDispatchToProps(dispatch){
  return {
    chatsLoad: () => dispatch(chatsLoad()),
    messageSend: (message) => dispatch(messageSend(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);