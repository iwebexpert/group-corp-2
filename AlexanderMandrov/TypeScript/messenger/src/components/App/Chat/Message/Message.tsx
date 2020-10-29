import React from 'react';
import classNames from 'classnames';
import './Message.scss';
import { Fab, Box, Typography, makeStyles } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const useStyles: () => Record<string, string> = makeStyles({
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
    maxWidth: '75%',
  },
  textWarning: {
    color: '#4527a0',
  },
  textSecondary: {
    color: '#00acc1',
  },
});

type MessageType = {
  message: IMessage;
  user?: string;
  isBot?: boolean;
  deleteMessage: (id: string) => void;
};

export const Message: React.FC<MessageType> = ({
  message,
  deleteMessage,
  isBot,
  user,
}) => {
  const {
    textPrimary,
    textSecondary,
    textWarning,
    messageInner,
    usernameStyle,
    timeStyle,
  } = useStyles();
  const { text, username, id, date } = message;

  const alignStyles: 'left' | 'right' = isBot ? 'left' : 'right';
  const dateFromStr: Date = new Date(date);
  const time: Date = isBot
    ? new Date(dateFromStr.getTime() + 2000)
    : new Date(dateFromStr);

  const btn: JSX.Element = (
    <Box pt={1}>
      <Fab color="secondary" size="small" onClick={() => deleteMessage(id)}>
        <DeleteForever />
      </Fab>
    </Box>
  );

  return (
    <Box width={1}>
      <Box
        display="flex"
        justifyContent={isBot ? 'flex-start' : 'flex-end'}
        mr={2}
      >
        <Box className={messageInner} mr={1} px={2} mb={1}>
          <Typography
            className={classNames(textWarning, usernameStyle)}
            align={alignStyles}
          >
            {isBot ? username : user}
          </Typography>
          <Typography className={textPrimary}>{text}</Typography>
          <Typography
            className={classNames(textSecondary, timeStyle)}
            align={alignStyles}
          >
            {time.toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </Typography>
        </Box>
        {!isBot && btn}
      </Box>
    </Box>
  );
};
