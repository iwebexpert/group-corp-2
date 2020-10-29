import React from 'react';
// import classnames from 'classnames';
// import { Link } from 'react-router-dom';
import './ChatItem.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

export default function ChatItem(props) {
  return(
      <ListItem button 
                className={props.currentChat==props.chats.id ? "chat__current-chat" : (props.unread ? "chat__unreadMessage" : null)}
                id={props.chats.id} 
                onClick={props.handleClickChat} >
        <ListItemAvatar>
          <AccountCircleOutlinedIcon className ="chat__userAvatar" />
        </ListItemAvatar>
        <h4 className="chat__username">{props.chats.title}</h4>
        <ListItemSecondaryAction>
          <button id={props.chats.id}  
                  onClick={props.handleOnClickDelete} 
                  className="chat__delete">X</button>
        </ListItemSecondaryAction>
      </ListItem>
  );
}