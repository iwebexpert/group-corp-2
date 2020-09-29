import React from 'react';
import './Chat.scss';
import Message from '../Message';
import { List, ListItem } from '@material-ui/core';

const Chat = ({ messageList, deleteMessage }) => {
  return (
    <List className="Chat">
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