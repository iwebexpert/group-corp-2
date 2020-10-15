import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import './MessengerScreen.css'

import { chatsLoad, messageSend, addChat, changeUnreadMessage, deleteChat, deleteMessage } from '../../store/messenger/actions';
import { profilesLoad } from '../../store/profile/actions';

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import Chat from '../../component/Chat/Chat';
import ChatList from '../../component/ChatList/ChatList';
import Card from '@material-ui/core/Card';
import Loader from '../../component/Loader/Loader';

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

  deleteMessage = (e) => {
    this.props.deleteMessage(this.props.chatId, e.target.id);
  };

  handleChatsReload = () => {
    this.props.chatsLoadAction();
}

  componentDidMount() {
    if(!this.props.chats[0])
      this.props.chatsLoad();
    
    if(!this.props.profile)
      this.props.profilesLoad();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
        this.props.changeUnreadMessage(this.props.id, 'remove');
    }
  }

  render() {
    const { id, chats, messages, profile, unreadMessage, isError, isLoading} = this.props;

    if (isError) {
      return(<div>Error... <button onClick={this.handleChatsReload}>Обновить чаты</button></div>);
    } else if (isLoading) {
      return(<Loader isLoading={isLoading} />);
    }

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
            { messages && profile ?
                          <Chat modifiers="chat_theme_chat"
                                messages={messages}
                                title={chats[id].title}
                                author={profile.name}
                                handleMessageSend={this.handleMessageSend}
                                deleteMessage={this.deleteMessage.bind(this)}  />
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
      isError: state.chats.error,
      isLoading: state.chats.loading,

      profile: state.profile.profiles[0],
  };
}

function mapDispatchToProps(dispatch){
  return {
    chatsLoad: () => dispatch(chatsLoad()),
    messageSend: (message) => dispatch(messageSend(message)),
    addChat: (title) => dispatch(addChat(title)),
    deleteChat: (chatId) => dispatch(deleteChat(chatId)),
    deleteMessage: (chatId, messageId) => dispatch(deleteMessage(chatId, messageId)),
    changeUnreadMessage: (chatId, command) => dispatch(changeUnreadMessage(chatId, command)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),

    profilesLoad: () => dispatch(profilesLoad()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);