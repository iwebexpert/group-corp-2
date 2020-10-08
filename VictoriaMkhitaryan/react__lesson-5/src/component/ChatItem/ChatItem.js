import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './ChatItem.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

export default function ChatItem(props) {
  return(
    <Link className = "chat__link" to={`/chats/${props.chats.id}`}>
      <ListItem button className={props.currentChat==props.chats.id ? "chat__current-chat" : null}>
        <ListItemAvatar>
          <AccountCircleOutlinedIcon className ="chat__userAvatar" />
        </ListItemAvatar>
        <h4 className = "chat__username">{props.chats.title}</h4>
        <ListItemSecondaryAction>
          <p className="chat__unreadMessage_text">{props.unread ? props.unread : null}</p>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
}