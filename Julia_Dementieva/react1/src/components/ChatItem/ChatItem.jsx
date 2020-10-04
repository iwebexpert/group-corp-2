import React, { Component } from 'react'
import {ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core';

import { Link } from 'react-router-dom';

export  class ChatItem extends Component {
    render() {
        const {avatar, author,id} = this.props;
        return (
            <div>
                <Link to={`/chats/${id}`} style={{ textDecoration: 'none' }}>
                <ListItem alignItems="center" key={id}>
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
        )
    }
}
