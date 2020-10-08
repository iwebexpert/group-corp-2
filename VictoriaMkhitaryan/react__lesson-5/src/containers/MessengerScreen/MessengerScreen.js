import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './MessengerScreen.css'

import { chatsLoad, messageSend, addChat } from '../../store/messenger/actions';

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import Chat from '../../component/Chat/Chat';
import ChatList from '../../component/ChatList/ChatList';
import Card from '@material-ui/core/Card';

class MessengerScreen extends Component {
  handleMessageSend = (message) => {
    const chatId = this.props.id;
    message.id = nanoid();
    this.props.messageSend({ ...message, chatId });
  };

  handleChatAdd = (title) => {
    this.props.addChat(title);
  }

  componentDidMount() {
    this.props.chatsLoad();
  }

  render() {
    const { id, chats, messages, profile } = this.props;

    console.log(chats);
    return(
      <>
        <Container modifiers="container_theme_chat">
          <Navbar profile={profile} />
          <Content modifiers="content_theme_chat">
            <ChatList chats={chats}
                      currentChat={id}
                      handleAdd={this.handleChatAdd} />
            { messages ?
                          <Chat modifiers="chat_theme_chat"
                                messages={messages}
                                title={chats[id].title}
                                author={profile.name}
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
  console.log(state, ownProps);
  const chats = state.chats.entries;
  const match = ownProps;

  let messages = null;


  if(match && chats[match.id]){
      messages = chats[match.id].messages;
  }
  
  return {
      chats,
      messages,
      chatId: match ? match.id: null,
      profile: state.profile.profiles[0]
  };
}

function mapDispatchToProps(dispatch){
  return {
    chatsLoad: () => dispatch(chatsLoad()),
    messageSend: (message) => dispatch(messageSend(message)),
    addChat: (title) => dispatch(addChat(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);