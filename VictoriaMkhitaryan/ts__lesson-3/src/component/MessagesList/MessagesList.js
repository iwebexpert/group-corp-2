import React from 'react';
import './MessagesList.css';

import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

export default function MessagesList(props) {
  return(
    props.messages.map(item => {
      return(
        <ListItem key={item.id}
                  className={(item.author != "Robot") ? "chat__list-item-come" : "chat__list-item-me"} >
          <div><h4 className="chat__user-text">{item.author}</h4></div>
          <div>
            <Chip label={item.message} className={(item.author != "Robot") ? "chat__chip-me" : null}/>
            <span id={item.id}
                  className="chat__delete-message"
                  onClick={props.deleteMessage}>X</span>
          </div>
        </ListItem>
      );
    })
  );
}