import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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
import { sendMessage, deleteMessage, setReceiver } from '../../redux/ducks/chats';
import { findChatIdByReceiver, findChatByReceiver } from '../../utils/utils';

const App = () => {
  const [ user ] = useState('yellso');
  let location = useLocation();

  const dispatch = useDispatch();
  const { chatsReducer } = useSelector((state) => state);
  const { chats, receiver } = chatsReducer;

  useEffect(() => {
    if (!receiver) dispatch(setReceiver(location.pathname.split('/')[2]));
  }, []);

  const deleteMessageById = (id) => dispatch(deleteMessage(id));

  const pushMessage = (messageText) => {
    const editId = findChatIdByReceiver(chats, receiver);
    dispatch(sendMessage(messageText, user, editId, receiver));
  };

  const handleChatClick = (receiver) => dispatch(setReceiver(receiver));

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
              <Route path="/chats/:id" render={() => (
                  <>
                    {!findChatByReceiver(chats, receiver) ? (
                      <Box mt={5}>
                        <Spinner />
                      </Box>
                      ) : (
                      <Chat 
                        user={user} 
                        deleteMessage={deleteMessageById}
                        getMessageList={() => findChatByReceiver(chats, receiver).messages} 
                      />
                    )}
                    <MessageForm pushMessage={pushMessage} />
                  </>
                )}
              />
            </Switch>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default App;