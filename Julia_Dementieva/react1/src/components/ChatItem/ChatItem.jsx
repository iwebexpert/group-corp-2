import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
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
