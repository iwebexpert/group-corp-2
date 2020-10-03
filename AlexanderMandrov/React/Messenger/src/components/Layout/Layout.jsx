import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './Layout.scss';
import CreateMessage from '../CreateMessage';
import Chat from '../Chat';
import Header from '../Header';
import WelcomePage from '../../pages/WelcomePage';
import { Drawer, List, ListItem, ListItemText, 
        ListItemAvatar, Avatar, Divider, Badge, 
        makeStyles, Container, Box, IconButton, TextField } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { deepOrange, deepPurple, green, blue, indigo, teal, cyan, lime } from '@material-ui/core/colors';
import { createMessage, createBotMessage, messageShorter, findChatIndexByReceiver, findMessagesByReceiver } from '../../utils/utils';
import { rawChats, notifications, avatarColors } from '../../constants/constants';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
  },
  badge: {
    top: 8,
    marginBottom: 8
  },
  main: {
    marginLeft: drawerWidth,
  },
  green: {
    backgroundColor: green[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
  indigo: {
    backgroundColor: indigo[500],
  },
  teal: {
    backgroundColor: teal[500],
  },
  cyan: {
    backgroundColor: cyan[500],
  },
  lime: {
    backgroundColor: lime[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));


const Layout = () => {
  const classes = useStyles();
  const { list, badge, main, green, orange, purple, blue, indigo, teal, cyan, lime } = classes;
  const [user, setUser] = useState('guest');
  const [chats, setChats] = useState(rawChats);
  const currentReceiver = window.location.pathname.split('/')[2];
  const [receiver, setReceiver] = useState(currentReceiver);
  const palette = [purple, orange, green, blue, indigo, teal, cyan, lime];

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
      <Drawer variant="persistent" open>
        <Box display="flex" justifyContent="space-between" className="Layout-add__chat" px={1} pt={1.2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Create new chat"
            fullWidth
          />
          <Box ml={1} mb={0} mt={-0.5}>
            <IconButton
                color="primary"
                variant="contained"
                size="medium">
              <AddCircleOutline/>
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <List className={list}>
          {chats.map(({ username, id, messages }, idx) => {
            const lastMessage = messages[messages.length - 1];
            const lastMessageText = messageShorter(lastMessage.text);
            return (
              <Link to={`/chats/${id}`} className="link-reset" key={nanoid()} onClick={setReceiver.bind(this, id)}>
                <ListItem button divider>
                    <ListItemAvatar>
                      <Badge color="secondary" badgeContent={notifications[idx]} className={badge}>
                        <Avatar className={palette[avatarColors[idx]]}>
                          {username.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText classes={{ secondary: 'listItemText' }} primary={username} secondary={lastMessage.username === user ? `You: ${lastMessageText}` : `${lastMessageText}`}/>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <main className={main}>
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