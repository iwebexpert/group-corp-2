import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    color: '#e4eaf1',
  },
  listItemChat: {
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#3d4044',
    },
  },
  listItemChatLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

export default function ChatList(props) {
  const classes = useStyles();

  const { chats } = props;
  return (
    <List dense className={classes.root}>
      {chats.map((chat, index) => {
        const labelId = `list-secondary-label-${chat.title + index}`;
        return (
          <Link key={chat.title} to={`/chat/${index}/`} className={classes.listItemChatLink}>
            <ListItem button className={classes.listItemChat}>
              <ListItemText id={labelId} primary={chat.title} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}

ChatList.propTypes = {
  chats: PropTypes.array,
};

ChatList.defaultTypes = {
  chats: [],
};