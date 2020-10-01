import React from 'react';
import classnames from 'classnames';
import './ChatItem.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

export default function ChatItem(props) {
  return(
    <ListItem button className = {props.unread ? "chat__unreadMessage" : null}>
      <ListItemAvatar>
        <AccountCircleOutlinedIcon className ="chat__userAvatar" />
      </ListItemAvatar>
      <h4 className = "chat__username">{props.chats.user.username}</h4>
      <ListItemSecondaryAction>
        <p className="chat__unreadMessage_text">{props.unread ? props.unread : null}</p>
      </ListItemSecondaryAction>
    </ListItem>
  );
}