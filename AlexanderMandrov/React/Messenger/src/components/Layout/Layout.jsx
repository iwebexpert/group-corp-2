import React, { useState, useEffect } from 'react';
import './Layout.scss';
import CreateMessage from '../CreateMessage';
import Chat from '../Chat';
import Header from '../Header';
import { Drawer, List, ListItem, ListItemText, 
        ListItemAvatar, Avatar, Divider, Badge, 
        makeStyles, Container, Box } from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';
import { createMessage, createBotMessage } from '../../utils/utils';
import { usernames, messages, notifications } from '../../constants/constants';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: 64,
    width: drawerWidth,
  },
  badge: {
    top: 8,
    marginBottom: 8
  },
  main: {
    marginLeft: drawerWidth,
  },
}));


const Layout = () => {
  const classes = useStyles();
  const { list, badge, main } = classes;
  const [username, setUsername] = useState('guest');
  const [messageList, setMessageList] = useState([]);
  const [tmpList, setTmpList] = useState([]);
  const [delayMessageList, setDelayMessageList] = useState([]);

  const deleteMessage = (id) => {
    setMessageList(messageList.filter(item => item.id !== id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessageList([
        ...messageList,
        ...tmpList
      ]);
      setTmpList([]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [delayMessageList]);

  const pushMessage = (messageText) => {
    setTmpList([...tmpList, createBotMessage(messageText, username)]);
    setMessageList([
      ...messageList, 
      createMessage(messageText, username),
    ]);
    setDelayMessageList([
      ...tmpList
    ]);
  };

  return (
    <>
      <Header />
      <Drawer variant="persistent" open>
        <List className={list}>
          <Divider />
          {usernames.map((user, idx) => {
            return (
              <ListItem button divider key={user}>
                <ListItemAvatar>
                  <Badge color="secondary" badgeContent={notifications[idx]} className={badge}>
                    <Avatar>
                      <PersonOutline />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary={user} secondary={messages[idx]}/>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={main}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" flexDirection="column" mb={5}>
            <Chat messageList={messageList} deleteMessage={deleteMessage} />
            <CreateMessage pushMessage={pushMessage}/>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Layout;