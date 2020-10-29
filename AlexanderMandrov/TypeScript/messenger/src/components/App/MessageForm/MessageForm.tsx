import React, { useState } from 'react';
import './MessageForm.scss';
import { Button, TextField, Box } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { validateInput } from '../../../utils/utils';

type MessageFormType = {
  pushMessage: (message: string) => void;
};

export const MessageForm: React.FC<MessageFormType> = ({ pushMessage }) => {
  const [message, setMessage] = useState<string>('');

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const onHandleClick = (): void => {
    if (validateInput(message)) {
      pushMessage(message);
      setMessage('');
    }
  };

  const onHandleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter' && event.ctrlKey) onHandleClick();
  };

  return (
    <div className="MessageForm">
      <Box display="flex" justifyContent="space-between" mx={1} mb={1} mt={1}>
        <TextField
          variant="outlined"
          size="small"
          className="input"
          placeholder="Write a message here.."
          fullWidth
          multiline
          value={message}
          onChange={onHandleChange}
          onKeyDown={onHandleKeyDown}
        />
        <Box ml={1} mb={0}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={onHandleClick}
          >
            <Send />
          </Button>
        </Box>
      </Box>
    </div>
  );
};
