import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import './App.scss';
import { MessageForm } from './MessageForm';
import { Chat } from './Chat';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Spinner } from '../Spinner';
import { WelcomePage } from '../../pages/WelcomePage';
import { ProfilePage } from '../../pages/ProfilePage';
import { Container, Box } from '@material-ui/core';
import { findChatIdByReceiver, findChatByReceiver } from '../../utils/utils';
import { AppState } from '../../redux/rootReducer';
import {
  sendMessage,
  deleteMessage,
  setReceiver,
} from '../../redux/ducks/chats';

export const App: React.FC = () => {
  const [user] = useState<string>('yellso');
  let location = useLocation();

  const dispatch: Dispatch = useDispatch();
  const { chatsReducer } = useSelector((state: AppState) => state);
  const { chats, receiver } = chatsReducer;

  useEffect(() => {
    if (!receiver) dispatch(setReceiver(location.pathname.split('/')[2]));
  }, []);

  const deleteMessageById: (id: string) => void = (id) =>
    dispatch(deleteMessage(id));

  const pushMessage: (messageText: string) => void = (messageText) => {
    if (chats && receiver) {
      const editId: string = findChatIdByReceiver(chats, receiver);
      dispatch(sendMessage(messageText, user, editId));
    }
  };

  const handleChatClick: (receiver: string) => void = (receiver) =>
    dispatch(setReceiver(receiver));

  return (
    <>
      <Header />
      <Sidebar user={user} onChatClick={handleChatClick} />
      <main className="App-main">
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
            mb={5}
          >
            <Switch>
              <Route path="/" exact component={WelcomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route
                path="/chats/:id"
                render={() => (
                  <>
                    {!chats ? (
                      <Box mt={5}>
                        <Spinner />
                      </Box>
                    ) : (
                      receiver && (
                        <Chat
                          user={user}
                          deleteMessage={deleteMessageById}
                          getMessageList={() =>
                            findChatByReceiver(chats, receiver).messages
                          }
                        />
                      )
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
