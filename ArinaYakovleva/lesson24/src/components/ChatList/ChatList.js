import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    width: '100%',
    marginLeft: '20px',
    borderRight: '1px solid gray',
  },
};

class ChatListClass extends Component{
  render(){
    const {classes, chats} = this.props;
    return (
      <List className={classes.root}>
        <h3>Your chats</h3>
        <hr />
        {chats.map((chat) => (
          <ListItem key={chat.id}>
            <ListItemAvatar>
              <Avatar>
                <ChatBubbleRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <Link to={`/chats/${chat.id}`}>
               <ListItemText primary={chat.title}
                    secondary={`Tap to see your ${chat.title} messages`}/>
            </Link>
         </ListItem>
       ))}

    </List>
  );
}
}

export const ChatList = withStyles(styles)(ChatListClass);
