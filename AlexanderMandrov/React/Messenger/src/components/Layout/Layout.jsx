import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Layout.scss';
import CreateMessage from '../CreateMessage';
import Chat from '../Chat';
import Header from '../Header';
import Sidebar from '../Sidebar';
import WelcomePage from '../../pages/WelcomePage';
import { Container, Box } from '@material-ui/core';
import { createMessage, createBotMessage, findChatIndexByReceiver, findMessagesByReceiver } from '../../utils/utils';
import { rawChats } from '../../constants/constants';

const Layout = () => {
  const [user, setUser] = useState('guest');
  const [chats, setChats] = useState(rawChats);
  const currentReceiver = window.location.pathname.split('/')[2];
  const [receiver, setReceiver] = useState(currentReceiver);
  
  const handleChatClick = (receiver) => {
    setReceiver(receiver);
  };

  const pushMessage = (messageText) => {
    const chat = findMessagesByReceiver(chats, receiver);
    chat.messages.push(createMessage(messageText, user));
    const editIdx = findChatIndexByReceiver(chats, receiver);
    setChats([...chats].map((elem, idx) => idx === editIdx ? chat : elem));
    setTimeout(() => {
      const { messages } = chat;
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.username !== 'Bot') {
        chat.messages.push(createBotMessage(user, receiver));
        setChats([...chats].map((elem, idx) => idx === editIdx ? chat : elem));
      }
    }, 2000);
  };

  return (
    <>
      <Header />
      <Sidebar chats={chats} user={user} onChatClick={handleChatClick} />
      <main className="Layout-main">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" flexDirection="column" mb={5}>
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/chats/:id" render={({ match }) => {
                const { id } = match.params;
                return <Chat getMessageList={() => findMessagesByReceiver(chats, id).messages} user={user} /> }} 
              />
            </Switch>
            <CreateMessage pushMessage={pushMessage}/>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Layout;