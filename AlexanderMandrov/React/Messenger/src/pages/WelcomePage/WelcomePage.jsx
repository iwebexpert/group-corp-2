import React from 'react';
import './WelcomePage.scss';
import { Typography } from '@material-ui/core';

const WelcomePage = () => {
  return (
    <Typography
        className="WelcomePage-title"
        variant="h5"
        align="center">
      Select a chat to start messaging
    </Typography>
  );
};

export default WelcomePage;