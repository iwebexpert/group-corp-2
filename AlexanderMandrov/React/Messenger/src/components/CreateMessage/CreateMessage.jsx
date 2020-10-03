import React, { useState } from 'react';
import './CreateMessage.scss';
import { Button, TextField, Box } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { validateInput } from '../../utils/utils';

const CreateMessage = ({ pushMessage }) => {
  const [message, setMessage] = useState('');

  const onHandleChange = (event) => {
    setMessage(event.target.value);
  };

  const onHandleClick = () => {
    if (validateInput(message)) {
      pushMessage(message);
      setMessage('');
    }
  };

  const onHandleKeyDown = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) onHandleClick();
  };


  return (
    <div className="CreateMessage">
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
          onKeyDown={onHandleKeyDown}/>
        <Box ml={1} mb={0}>
          <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={onHandleClick}>
            <Send/>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CreateMessage;