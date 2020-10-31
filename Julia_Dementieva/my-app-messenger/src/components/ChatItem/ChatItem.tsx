import React from 'react';
import {ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './ChatItem.css';

import {ChatType} from '../../types/types';

type ChatItemType = ChatType & {
    onClick: (id: number) => void;
    fire: boolean;
};

export  const ChatItem: React.FC<ChatItemType> = ({onClick, id, avatar, author, fire}) => {

    const chatClickHandler = (): void => {
        onClick(id);  
    };

    return (
        <div>
            <Link to={`/chats/${id}`} style={{ textDecoration: 'none' }}>
            <ListItem alignItems="center" className={classNames({ 'fire': fire })} key={id} onClick={chatClickHandler}>
                <ListItemAvatar>
                <Avatar src={avatar} />  
                
                </ListItemAvatar>
                <ListItemText
                primary={author}
                />
            </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
        </div>
    );
    
}
