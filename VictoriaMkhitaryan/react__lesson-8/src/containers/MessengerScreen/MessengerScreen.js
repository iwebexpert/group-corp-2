import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
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
import { BlockLoading } from 'react-loadingg';

export const MessengerScreen = (props) => {
  const dispatch = useDispatch();

  const { chatId } = useParams();

  const [isLoading, isError] = useSelector((state) => [state.chats.loading, state.chats.error]);

  const chats = useSelector(state => state.chats.entries);
  const messages = chats[chatId] ? chats[chatId].messages : null;
  const unreadMessage = useSelector(state => state.chats.unreadMessage);
  const profile = useSelector(state => state.profile.profiles[0]);

  useEffect(() => {
    if(!chats.length)
      dispatch(chatsLoad());
    if(!profile)
      dispatch(profilesLoad());

    dispatch(changeUnreadMessage(chatId, 'remove'));
  }, [ chatId ]);

  const handleMessageSend = (message) => {
    message.id = nanoid();
    dispatch(messageSend({ ...message, chatId }));
  };

  const handleChatAdd = (title) => {
    dispatch(addChat(title));
    

    dispatch(push(`/chats/${(chats.length ? chats[chats.length - 1].id : 0 )+ 1}`));
  }

  const handleClickChat = (e) => {
    dispatch(push(`/chats/${Number(e.target.id)}`));
  }

  const handleOnClickDelete = (e) => {
    dispatch(deleteChat(e.target.id));
  }

  const deleteMessages = (e) => {
    console.log(chatId, e.target);
    dispatch(deleteMessage(chatId, e.target.id));
  };

  const handleChatsReload = () => {
    dispatch(chatsLoad);
}

  return(
    <> 
      { isError && <div>Error... <button onClick={handleChatsReload}>Обновить чаты</button></div> }
      { isLoading && 
          <div className="loader">
            <BlockLoading size="large" />
          </div> }
      <Container modifiers="container_theme_chat">
        <Navbar profile={profile} />
        <Content modifiers="content_theme_chat">
        
          <ChatList chats={chats}
                    currentChat={chatId}
                    handleAdd={handleChatAdd}
                    unreadMessage={unreadMessage}
                    handleClickChat={handleClickChat}
                    handleOnClickDelete={handleOnClickDelete} />
          { messages && profile ?
                        <Chat modifiers="chat_theme_chat"
                              messages={messages}
                              title={chats[chatId].title}
                              author={profile.name}
                              handleMessageSend={handleMessageSend}
                              deleteMessage={deleteMessages}  />
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