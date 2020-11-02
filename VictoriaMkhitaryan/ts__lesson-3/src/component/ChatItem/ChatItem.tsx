import React from 'react';
import './ChatItem.css';

import { MessageType, ChatsData } from '../../types/types';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

type ChatItemType = {
  chats: ChatsData;
  unread: boolean;
  currentChat: number;
  handleClickChat: (e: any) => void;
  handleOnClickDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ChatItem: React.FC<ChatItemType> = ({ chats, unread, currentChat, handleClickChat, handleOnClickDelete }) => {
  return(
    <>
      <ListItem button 
                className={currentChat==chats.id ? "chat__current-chat" : (unread ? "chat__unreadMessage" : '')}
                id={String(chats.id)} 
                onClick={handleClickChat} >
        <ListItemAvatar>
          <AccountCircleOutlinedIcon className ="chat__userAvatar" />
        </ListItemAvatar>
        <h4 className="chat__username">{chats.title}</h4>
        <ListItemSecondaryAction>
          <button id={String(chats.id)}  
                  onClick={handleOnClickDelete} 
                  className="chat__delete">X</button>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}