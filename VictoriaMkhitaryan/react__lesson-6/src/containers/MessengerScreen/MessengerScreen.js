import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import './MessengerScreen.css'

import { chatsLoad, messageSend, addChat, changeUnreadMessage, deleteChat } from '../../store/messenger/actions';

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
    
    this.props.redirect(this.props.chats[this.props.chats.length - 1].id + 1);
  }

  handleClickChat = (e) => {
    this.props.redirect(Number(e.target.id));
  }

  handleOnClickDelete = (e) => {
    this.props.deleteChat(e.target.id);
  }

  componentDidMount() {
    if (!this.props.chats[0])
      this.props.chatsLoad();
  }

  componentDidUpdate(prevProps) {
    // сначала сделала заполняесый массив, но была проблема с тем
    // что тк изменяется содержимое массива, то redux не считает, что изменился сам массив
    // => компонент не перерендеривается до какого-то действия пользователя
    // скорее всего это было из-за того что в reducer не использовала update, а просто заменяла старый массив на новый
    // до того как поняла это уже полностью переделала)
    if (prevProps.id !== this.props.id) {
        this.props.changeUnreadMessage(this.props.id, 'remove');
    }
  }

  render() {
    const { id, chats, messages, profile, unreadMessage } = this.props;

    return(
      <>
        <Container modifiers="container_theme_chat">
          <Navbar profile={profile} />
          <Content modifiers="content_theme_chat">
            <ChatList chats={chats}
                      currentChat={id}
                      handleAdd={this.handleChatAdd}
                      unreadMessage={unreadMessage}
                      handleClickChat={this.handleClickChat.bind(this)}
                      handleOnClickDelete={this.handleOnClickDelete.bind(this)} />
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
      profile: state.profile.profiles[0],
      unreadMessage: state.chats.unreadMessage,
  };
}

function mapDispatchToProps(dispatch){
  return {
    chatsLoad: () => dispatch(chatsLoad()),
    messageSend: (message) => dispatch(messageSend(message)),
    addChat: (title) => dispatch(addChat(title)),
    deleteChat: (chatId) => dispatch(deleteChat(chatId)),
    changeUnreadMessage: (chatId, command) => dispatch(changeUnreadMessage(chatId, command)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);