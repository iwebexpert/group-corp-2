import React from 'react';
import { useDispatch } from 'react-redux';
import './Error.scss';
import { IconButton, Box } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { fetchProfileInfo } from '../../redux/ducks/profile';

const Error = ({ handleClick, mx }) => {
  const dispatch = useDispatch();
  return (
    <Box mx={mx} my="auto">
      Something went wrong...
      <IconButton
          color="secondary"
          variant="contained"
          size="medium"
          onClick={() => handleClick(dispatch)}>
        <Replay />
      </IconButton>
    </Box>
  );
};

Error.defaultProps = {
  handleClick: (dispatch) => dispatch(fetchProfileInfo('yellso')),
  mx: 'auto',
};

export default Error;