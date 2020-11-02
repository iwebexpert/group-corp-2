import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { nanoid } from 'nanoid';
import { Spinner } from '../Spinner';
import { Error } from '../Error';
import { AddCircleOutline } from '@material-ui/icons';
import { sendNewChat, setReceiver, fetchChats } from '../../redux/ducks/chats';
import { createPrimaryChat } from '../../constants/constants';
import { messageShorter, validateNewChat } from '../../utils/utils';
import { AppState } from '../../redux/rootReducer';
import './Sidebar.scss';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  makeStyles,
  Box,
  IconButton,
  TextField,
  Theme,
} from '@material-ui/core';
import {
  deepOrange,
  deepPurple,
  green,
  blue,
  indigo,
  teal,
  cyan,
  lime,
} from '@material-ui/core/colors';

const useStyles: (theme?: Theme) => Record<string, string> = makeStyles(
  (theme) => ({
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
  })
);

type SidebarType = {
  user: string;
  onChatClick: (receiver: string) => void;
};

export const Sidebar: React.FC<SidebarType> = ({ user, onChatClick }) => {
  const dispatch: Dispatch = useDispatch();
  const { chatsReducer } = useSelector((state: AppState) => state);
  const { chats, error, receiver, loading } = chatsReducer;

  const { green, orange, purple, blue, indigo, teal, cyan, lime } = useStyles();

  const [newReceiver, setNewReceiver] = useState<string>('');
  const [isValidReceiver, setIsValidReceiver] = useState<boolean>(true);
  const palette: string[] = [
    purple,
    orange,
    green,
    blue,
    indigo,
    teal,
    cyan,
    lime,
  ];

  useEffect(() => {
    if (!chats) dispatch(fetchChats());
  }, []);

  useEffect(() => {
    if (chats) {
      if (validateNewChat(chats, newReceiver)) {
        setIsValidReceiver(true);
      } else {
        setIsValidReceiver(false);
      }
    }
  }, [newReceiver]);

  const handleChatAddClick: () => void = () => {
    if (chats) {
      if (validateNewChat(chats, newReceiver)) {
        const chat: IChat = createPrimaryChat(newReceiver, user);
        dispatch(sendNewChat(chat));
        dispatch(push(`/chats/${newReceiver}`));
        dispatch(setReceiver(newReceiver));
        setNewReceiver('');
      }
    }
  };

  const handleReloadChatsClick: () => void = () => dispatch(fetchChats());

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => setNewReceiver(event.target.value);
  return (
    <Drawer variant="persistent" open>
      <Box
        display="flex"
        justifyContent="space-between"
        className="Sidebar-add__chat"
        px={1}
        pt={1.2}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Create new chat"
          error={!isValidReceiver}
          value={newReceiver}
          fullWidth
          onChange={handleChange}
        />
        <Box ml={1} mb={0} mt={-0.5}>
          <IconButton
            color="primary"
            size="medium"
            onClick={handleChatAddClick}
          >
            <AddCircleOutline />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <List className="Sidebar-list" disablePadding>
        {!error ? null : <Error mx="2" handleClick={handleReloadChatsClick} />}
        {chats === null ? (
          <Spinner color="teal" />
        ) : (
          chats.map(
            (
              {
                username,
                messages,
                fired,
              }: { username: string; messages: IMessage[]; fired: boolean },
              idx: number
            ) => {
              const lastMessage = messages.length
                ? messages[messages.length - 1]
                : '';
              const lastMessageText = messages.length
                ? messageShorter(messages[messages.length - 1].text)
                : 'No messages here yet';
              return (
                <Link
                  to={`/chats/${username}`}
                  className="Sidebar-link__reset"
                  key={nanoid()}
                  onClick={onChatClick.bind(window, username)}
                >
                  <ListItem button divider selected={username === receiver}>
                    <ListItemAvatar>
                      <Badge color="secondary" variant="dot" invisible={!fired}>
                        <Avatar className={palette[idx % 8]}>
                          {username.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      classes={{ secondary: 'Sidebar-last__message' }}
                      primary={username}
                      secondary={
                        lastMessage !== '' && lastMessage.username === user
                          ? `You: ${lastMessageText}`
                          : `${lastMessageText}`
                      }
                    />
                  </ListItem>
                </Link>
              );
            }
          )
        )}
        {chats !== null && loading ? (
          <Spinner size={80} color="#9013FE" />
        ) : null}
      </List>
    </Drawer>
  );
};
