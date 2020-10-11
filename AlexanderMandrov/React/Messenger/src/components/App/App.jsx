import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import MessageForm from '../MessageForm';
import Chat from '../Chat';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Spinner from '../Spinner';
import WelcomePage from '../../pages/WelcomePage';
import ProfilePage from '../../pages/ProfilePage';
import { Container, Box } from '@material-ui/core';
import { setSendMessage, setChats, setReceiver } from '../../redux/ducks/chats';
import { findChatIndexByReceiver, findChatByReceiver } from '../../utils/utils';

const App = () => {
  const [ user ] = useState('yellso');
  let location = useLocation();

  const dispatch = useDispatch();
  const { chatsReducer } = useSelector((state) => state);
  const { chats, receiver } = chatsReducer;

  useEffect(() => {
    if (!receiver) dispatch(setReceiver(location.pathname.split('/')[2]));
  }, []);

  const deleteMessage = (id) => {
    const chat = findChatByReceiver(chats, receiver);
    chat.messages = chat.messages.filter(item => item.id !== id);
    const editIdx = findChatIndexByReceiver(chats, receiver);
    dispatch(setChats([...chats].map((elem, idx) => idx === editIdx ? chat : elem)));
  };

  const pushMessage = (messageText) => {
    const editIdx = findChatIndexByReceiver(chats, receiver);
    dispatch(setSendMessage(messageText, user, editIdx, receiver));
  };

  return (
    <>
      <Header />
      <Sidebar user={user} onChatClick={(receiver) => dispatch(setReceiver(receiver))} activeChat={receiver} />
      <main className="App-main">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" flexDirection="column" mb={5}>
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/chats/:id" render={() => {
                if (chats === null) return <Spinner />;
                if (findChatIndexByReceiver(chats, receiver) === -1) return <Redirect to="/" />;
                return (
                  <>
                    <Chat getMessageList={() => findChatByReceiver(chats, receiver).messages} user={user} deleteMessage={deleteMessage} />
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