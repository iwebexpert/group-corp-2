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
import { setSendMessage, setChats, setSendBotMessage } from '../../redux/ducks/chats';
import { fetchProfileInfo } from '../../redux/ducks/profile';
import { findChatIndexByReceiver, findChatByReceiver, setDelay } from '../../utils/utils';
import { rawProfileInfo } from '../../constants/constants';

const App = () => {
  const [ user ] = useState('yellso');
  const [isBotReplying, setIsBotReplying] = useState(false);
  let location = useLocation();
  const currentReceiver = location.pathname.split('/')[2];
  const [receiver, setReceiver] = useState(currentReceiver);

  const dispatch = useDispatch();
  const { chatsReducer, profileReducer } = useSelector((state) => state);
  const { chats } = chatsReducer;
  const { data } = profileReducer;

  useEffect(() => {
    if (!data) dispatch(fetchProfileInfo(rawProfileInfo));
  }, []);

  useEffect(() => {
    if (chats && receiver) {
      const editIdx = findChatIndexByReceiver(chats, receiver);
      if (editIdx === -1) return ;
      const chat = findChatByReceiver(chats, receiver);
      const { messages } = chat;
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.username === user && !isBotReplying) {
        setIsBotReplying(true);
        setDelay(user, receiver, dispatch, setSendBotMessage, editIdx);
      }
      if (lastMessage.username === 'Bot') setIsBotReplying(false);
    }
  }, [chats]);

  const deleteMessage = (id) => {
    const chat = findChatByReceiver(chats, receiver);
    chat.messages = chat.messages.filter(item => item.id !== id);
    const editIdx = findChatIndexByReceiver(chats, receiver);
    dispatch(setChats([...chats].map((elem, idx) => idx === editIdx ? chat : elem)));
  };
  
  const handleChatClick = (receiver) => {
    setReceiver(receiver);
  };

  const pushMessage = (messageText) => {
    const editIdx = findChatIndexByReceiver(chats, receiver);
    dispatch(setSendMessage(messageText, user, editIdx));
  };

  return (
    <>
      <Header />
      <Sidebar user={user} onChatClick={handleChatClick} />
      <main className="App-main">
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" flexDirection="column" mb={5}>
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/chats/:id" render={() => {
                if (chats === null) return <Spinner />;
                const idx = findChatIndexByReceiver(chats, receiver);
                if (idx === -1) return <Redirect to="/" />;
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