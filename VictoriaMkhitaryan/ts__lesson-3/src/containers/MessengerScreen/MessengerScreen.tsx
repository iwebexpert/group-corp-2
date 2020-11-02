import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import './MessengerScreen.css'

import { chatsLoad, messageSend, addChat, changeUnreadMessage, deleteChat, deleteMessage } from '../../store/messenger/actions';
import { profilesLoad } from '../../store/profile/actions';

import { AppState } from '../../store/reducers';
import { MessageType, NewChatType } from '../../types/types';

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import { Chat } from '../../component/Chat/Chat';
import { ChatList } from '../../component/ChatList/ChatList';
import Card from '@material-ui/core/Card';
// import { BlockLoading } from 'react-loadingg';

export const MessengerScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { chatId } = useParams<{chatId: string}>();
  const chatIdNum = Number(chatId);

  const [isLoading, isError] = useSelector((state: AppState) => [state.chats.loading, state.chats.error]);

  const chats = useSelector((state: AppState) => state.chats.entries);
  const messages = chats[chatIdNum] ? chats[chatIdNum].messages : null;
  const unreadMessage = useSelector((state: AppState) => state.chats.unreadMessage);
  const profile = useSelector((state: AppState) => state.profile.profiles[0]);

  useEffect(() => {
    if(!chats.length)
      dispatch(chatsLoad());
    if(!profile)
      dispatch(profilesLoad());

    dispatch(changeUnreadMessage(chatIdNum, 'remove'));
  }, [ chatIdNum ]);

  const handleMessageSend = (message: MessageType) => {
    // message.id = nanoid();
    dispatch(messageSend({ ...message, chatId: chatIdNum }));
  };

  const handleChatAdd = (title: NewChatType) => {
    dispatch(addChat(title));
    

    dispatch(push(`/chats/${(chats.length ? chats[chats.length - 1].id : 0 )+ 1}`));
  }

  const handleClickChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(push(`/chats/${Number(e.target.id)}`));
  }

  const handleOnClickDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(deleteChat(Number(e.target.id)));
  }

  const deleteMessages = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(chatIdNum, e.target);
    dispatch(deleteMessage(chatIdNum, Number(e.target.id)));
  };

  const handleChatsReload = () => {
    dispatch(chatsLoad());
  }

  if(isError) return <div>Error... <button onClick={handleChatsReload}>Обновить чаты</button></div>;
  return(
    <> 
      
      { isLoading && 
          <div className="loader">
            {/* <BlockLoading size="large" /> */}
          </div> }
      <Container modifiers="container_theme_chat">
        <Navbar profile={profile} />
        <Content modifiers="content_theme_chat">
        
          <ChatList chats={chats}
                    currentChat={chatIdNum}
                    handleAdd={handleChatAdd}
                    unreadMessage={unreadMessage}
                    handleClickChat={handleClickChat}
                    handleOnClickDelete={handleOnClickDelete} />
          { messages && profile ?
                        <Chat modifiers="chat_theme_chat"
                              messages={messages}
                              title={chats[chatIdNum].title}
                              author={profile.name}
                              handleMessageSend={handleMessageSend}
                              deleteMessage={deleteMessages}  />
                    : 
                        <Card className="chat__card-warn">
                          <h4 className="chat__warn">Выбери чат</h4>
                        </Card>
          }
        </Content>
      </Container>
    </>
  );
        }