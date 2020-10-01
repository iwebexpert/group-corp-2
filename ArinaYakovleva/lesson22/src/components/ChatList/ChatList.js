import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';

const styles = {
  root: {
    width: '100%',
    marginLeft: '20px',
    borderRight: '1px solid gray',
  },
};

class ChatListClass extends Component{
  
  render(){
    const {classes} = this.props;
    return (
      <List className={classes.root}>
        <h3>Your chats</h3>
        <hr />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ChatBubbleRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Friends chat" secondary="This saturday we are going to camping" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ChatBubbleRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work chat" secondary="Hello everybody, today we are having a conference call at 14:00" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ChatBubbleRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Family chat" secondary="Family dinner at 20:00" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ChatBubbleRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Alina" secondary="Hi, do you want to hang out today?" />
      </ListItem>
    </List>
  );
}
}

export const ChatList = withStyles(styles)(ChatListClass);
