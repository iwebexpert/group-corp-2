import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import MessageForm from '../MessageForm';
import Chat from '../Chat';
import Header from '../Header';
import Sidebar from '../Sidebar';
import WelcomePage from '../../pages/WelcomePage';
import ProfilePage from '../../pages/ProfilePage';
import { Container, Box } from '@material-ui/core';
import { createMessage, findChatIndexByReceiver, findChatByReceiver, setDelay } from '../../utils/utils';
import { rawChats, createPrimaryChats } from '../../constants/constants';

const App = () => {
  const [user, setUser] = useState('guest');
  const [chats, setChats] = useState(rawChats);
  const currentReceiver = window.location.pathname.split('/')[2];
  const [receiver, setReceiver] = useState(currentReceiver);

  const deleteMessage = (id) => {
    const chat = findChatByReceiver(chats, receiver);
    chat.messages = chat.messages.filter(item => item.id !== id);
    const editIdx = findChatIndexByReceiver(chats, receiver);
    setChats([...chats].map((elem, idx) => idx === editIdx ? chat : elem));
  };
  
  const handleChatClick = (receiver) => {
    setReceiver(receiver);
  };

  const pushMessage = (messageText) => {
    const chat = findChatByReceiver(chats, receiver);
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
      <main className="App-main">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" flexDirection="column" mb={5}>
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/profile" render={() => <ProfilePage user={user} />} />
              <Route path="/chats/:id" render={({ match }) => {
                const { id } = match.params;
                if (findChatIndexByReceiver(chats, id) === -1) return <Redirect to="/" />;
                return (
                  <>
                    <Chat getMessageList={() => findChatByReceiver(chats, id).messages} user={user} deleteMessage={deleteMessage} />
                    <MessageForm pushMessage={pushMessage} />
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

export default App;