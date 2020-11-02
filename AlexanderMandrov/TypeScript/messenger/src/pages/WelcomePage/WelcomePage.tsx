import React from 'react';
import './WelcomePage.scss';
import { Typography } from '@material-ui/core';

export const WelcomePage: React.FC = () => {
  return (
    <Typography className="WelcomePage-title" variant="h5" align="center">
      Select a chat to start messaging
    </Typography>
  );
};
