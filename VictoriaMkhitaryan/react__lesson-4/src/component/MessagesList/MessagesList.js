import React from 'react';
import './MessagesList.css';

import Message from '../Message/Message';

import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

export default function MessagesList(props) {
  return(
    props.messages.map(item => 
      <ListItem key={item.id} className={(item.author != "Robot") ? "chat__list-item-come" : "chat__list-item-me"}>
        <div><h4 className="chat__user-text">{item.author}</h4></div>
        <Chip label={item.message} className={(item.author != "Robot") ? "chat__chip-me" : null}/>
      </ListItem>
    )
  );
}