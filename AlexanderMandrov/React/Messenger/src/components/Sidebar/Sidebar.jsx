import React from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './Sidebar.scss';
import { Drawer, List, ListItem, ListItemText, 
        ListItemAvatar, Avatar, Divider, Badge, 
        makeStyles, Box, IconButton, TextField } from '@material-ui/core';
import { deepOrange, deepPurple, green, blue, indigo, teal, cyan, lime } from '@material-ui/core/colors';
import { AddCircleOutline } from '@material-ui/icons';
import { notifications, avatarColors } from '../../constants/constants';
import { messageShorter } from '../../utils/utils';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
  },
  badge: {
    top: 8,
    marginBottom: 8
  },
  green: {
    backgroundColor: green[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
  indigo: {
    backgroundColor: indigo[500],
  },
  teal: {
    backgroundColor: teal[500],
  },
  cyan: {
    backgroundColor: cyan[500],
  },
  lime: {
    backgroundColor: lime[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Sidebar = ({ chats, user, onChatClick }) => {
  const classes = useStyles();
  const {list, badge, green, orange, purple, blue, indigo, teal, cyan, lime } = classes;
  const palette = [purple, orange, green, blue, indigo, teal, cyan, lime];
  return (
    <Drawer variant="persistent" open>
      <Box display="flex" justifyContent="space-between" className="Sidebar-add__chat" px={1} pt={1.2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Create new chat"
          fullWidth
        />
        <Box ml={1} mb={0} mt={-0.5}>
          <IconButton
              color="primary"
              variant="contained"
              size="medium">
            <AddCircleOutline/>
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <List className={list}>
        {chats.map(({ username, id, messages }, idx) => {
          const lastMessage = messages[messages.length - 1];
          const lastMessageText = messageShorter(lastMessage.text);
          return (
            <Link to={`/chats/${id}`} className="Sidebar-link__reset" key={nanoid()} onClick={onChatClick.bind(this, id)}>
              <ListItem button divider>
                  <ListItemAvatar>
                    <Badge color="secondary" badgeContent={notifications[idx]} className={badge}>
                      <Avatar className={palette[avatarColors[idx]]}>
                        {username.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText classes={{ secondary: 'Sidebar-last__message' }} primary={username} secondary={lastMessage.username === user ? `You: ${lastMessageText}` : `${lastMessageText}`}/>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;