import React, { createRef, useEffect } from 'react';
import './Chat.scss';
import Message from '../Message';
import { List, ListItem } from '@material-ui/core';

const Chat = ({ messageList, deleteMessage }) => {
  const list = createRef();
  
  const onHandleScrollBottom = () => {
    const ref = list.current;
    ref.scrollTop = 999;
  };

  useEffect(() => {
    onHandleScrollBottom();
  }, [messageList]);

  return (
    <List className="Chat" ref={list}>
      {messageList.map(message => {
        return (
          <ListItem key={message.id} disableGutters>
            {message.username !== 'Bot' ? 
              <Message message={message} deleteMessage={deleteMessage} /> :
              <Message message={message} isBot />}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Chat;