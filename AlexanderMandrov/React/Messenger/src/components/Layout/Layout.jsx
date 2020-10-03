import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Layout.scss';
import CreateMessage from '../CreateMessage';
import Chat from '../Chat';
import Header from '../Header';
import Sidebar from '../Sidebar';
import WelcomePage from '../../pages/WelcomePage';
import { Container, Box } from '@material-ui/core';
import { createMessage, findChatIndexByReceiver, findMessagesByReceiver, setDelay } from '../../utils/utils';
import { rawChats, createPrimaryChats } from '../../constants/constants';

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
    setDelay(chat, chats, setChats, user, receiver, editIdx);
  };

  const pushRawChat = (receiver) => {
    const chat = createPrimaryChats([receiver], user)[0];
    setChats([chat, ...chats]);
    setDelay(chat, chats, setChats, user, receiver);
  };

  return (
    <>
      <Header />
      <Sidebar chats={chats} user={user} onChatClick={handleChatClick} pushRawChat={pushRawChat} />
      <main className="Layout-main">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" flexDirection="column" mb={5}>
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/chats/:id" render={({ match }) => {
                const { id } = match.params;
                if (findChatIndexByReceiver(chats, id) === -1) return <Redirect to="/" />;
                return (
                  <>
                    <Chat getMessageList={() => findMessagesByReceiver(chats, id).messages} user={user} />
                    <CreateMessage pushMessage={pushMessage}/>
                  </>
                );
              }} 
              />
              <Redirect to="/" />
            </Switch>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Layout;