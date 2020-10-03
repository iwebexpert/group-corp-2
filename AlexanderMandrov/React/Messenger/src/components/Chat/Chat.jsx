import React, { createRef, useEffect } from 'react';
import './Chat.scss';
import Message from '../Message';
import { List, ListItem } from '@material-ui/core';

const Chat = ({ getMessageList, user }) => {
  const list = createRef();

  useEffect(() => {
    list.current.scrollTop = 999;
  }, [getMessageList]);

  return (
    <List className="Chat" ref={list}>
      {getMessageList().map(message => {
        return (
          <ListItem key={message.id} disableGutters>
            {message.username === user ? 
              <Message message={message} user={user} /> :
              <Message message={message} isBot />}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Chat;