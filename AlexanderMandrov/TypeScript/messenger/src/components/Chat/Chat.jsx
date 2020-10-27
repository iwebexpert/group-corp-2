import React, { createRef, useEffect } from 'react';
import './Chat.scss';
import { Message } from './Message/Message';
import { List, ListItem } from '@material-ui/core';

const Chat = ({ user, deleteMessage, getMessageList }) => {
  const list = createRef();

  useEffect(() => {
    list.current.scrollTop = 999999;
  }, [getMessageList]);

  return (
    <List className="Chat" ref={list}>
      {getMessageList().map((message) => {
        return (
          <ListItem key={message.id} disableGutters>
            {message.username === user ? (
              <Message
                message={message}
                user={user}
                deleteMessage={deleteMessage}
              />
            ) : (
              <Message message={message} isBot />
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Chat;
