import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const ChatList = ({ allChats, setAllChats }) => {
  const [newChatField, setNewChatField] = useState('');

  //Устанавливаю новый чат и передаю его в мессенджер
  const sendNewChat = () => {
    setAllChats([
      ...allChats,
      { id: allChats.length, title: newChatField, messages: [] },
    ]);
  };

  return (
    <>
      <div className="chatlist">
        <div className="chatlist__navbar">
          <List component="nav">
            {allChats.map((chat) => (
              <ListItem key={chat.id}>
                <Link to={`/chats/${chat.id}`}>
                  <ListItemText primary={chat.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="chatlist__add">
        <TextField
          label="Новый чат"
          value={newChatField}
          onChange={(e) => setNewChatField(e.target.value)}
        />
        <Button onClick={sendNewChat}>Создать</Button>
      </div>
    </>
  );
};

export default ChatList;
