import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

export default function ChatList() {
  return (
    <div className="chatlist">
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Чат 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Чат 2" />
        </ListItem>
      </List>
    </div>
  );
}
