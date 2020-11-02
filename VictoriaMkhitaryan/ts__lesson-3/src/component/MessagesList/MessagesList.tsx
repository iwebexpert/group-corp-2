import React from 'react';
import './MessagesList.css';

import { MessageType } from '../../types/types';

import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

type MessagesListType = {
  messages: MessageType[];
  deleteMessage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const MessagesList: React.FC<MessagesListType> = ({ messages, deleteMessage }) => {
  return(
    messages.map(item => {
      return(
        <ListItem key={item.id}
                  className={(item.author != "Robot") ? "chat__list-item-come" : "chat__list-item-me"} >
          <div><h4 className="chat__user-text">{item.author}</h4></div>
          <div>
            <Chip label={item.message} className={(item.author != "Robot") ? "chat__chip-me" : null}/>
            <span id={item.id}
                  className="chat__delete-message"
                  onClick={deleteMessage}>X</span>
          </div>
        </ListItem>
      );
    })
  );
}