import React from 'react';
import classNames from 'classnames';
import './Message.scss';
import { Fab, Box, Typography, makeStyles } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const useStyles = makeStyles({
  usernameStyle: {
    fontSize: 12,
  },
  timeStyle: {
    fontSize: 10,
  },
  textPrimary: {
    fontSize: 16,
    color: '#0d47a1', 
  },
  messageInner: {
    backgroundColor: '#bbdefb',
    borderRadius: 15,
    minWidth: 250,
    maxWidth: "75%"
  },
  textWarning: {
    color: '#4527a0'
  },
  textSecondary: {
    color: '#00acc1'
  }
});

const Message = ({ message, deleteMessage, isBot }) => {
  const classes = useStyles();
  const { textPrimary, textSecondary, textWarning,
          messageInner, usernameStyle, timeStyle } = classes;
  const { text, date, username, id } = message;

  const alignStyles = isBot ? 'left' : 'right';
  const time = isBot ? new Date(date.getTime() + 1000) : date;

  const btn = (
    <Box pt={1}>
      <Fab 
          color="secondary"
          size="small"
          onClick={() => deleteMessage(id)}>
        <DeleteForever/>
      </Fab>
    </Box>
  );

  return (
    <Box width={1}>
      <Box display="flex" justifyContent={isBot ? 'flex-start': 'flex-end'} mr={1}>
        <Box className={messageInner} mr={1} px={2} mb={1}>
          <Typography 
              className={classNames(textWarning, usernameStyle)} 
              align={alignStyles}>
            {username}
          </Typography>
          <Typography 
              className={textPrimary}>
            {text}
          </Typography>
          <Typography 
              className={classNames(textSecondary, timeStyle)} 
              align={alignStyles}>
            {time.toLocaleString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
          </Typography>
        </Box>
        {isBot ? null : btn}
      </Box>
    </Box>
  );
};

export default Message;