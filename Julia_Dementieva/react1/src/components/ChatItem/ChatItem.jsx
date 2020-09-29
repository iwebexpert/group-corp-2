import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

export  class ChatItem extends Component {
    render() {
        const {avatar, author} = this.props;
        return (
            <div>
                <ListItem alignItems="center">
                        <ListItemAvatar>
                        <Avatar>{avatar}</Avatar>    
                        </ListItemAvatar>
                        <ListItemText
                        primary={author}
                        />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        )
    }
}
