import React from 'react';
import './MessagesList.css';

import { MessageType } from '../../types/types';

import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

type MessagesListType = {
  messages: MessageType[];
  deleteMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MessagesList: React.FC<MessagesListType> = ({ messages, deleteMessage }) => {
  return(
    <>
      {
        messages.map(item =>
          <ListItem key={item.id}
                    className={(item.author != "Robot") ? "chat__list-item-come" : "chat__list-item-me"} >
            <div><h4 className="chat__user-text">{item.author}</h4></div>
            <div>
              <Chip label={item.message} className={(item.author != "Robot") ? "chat__chip-me" : ""}/>
              {/* <span id={item.id}
                    className="chat__delete-message"
                    onClick={deleteMessage}>X</span> */}
            </div>
          </ListItem>
      )}
    </>
  );
}