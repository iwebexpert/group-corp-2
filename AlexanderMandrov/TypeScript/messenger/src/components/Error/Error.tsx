import React from 'react';
import { useDispatch } from 'react-redux';
import './Error.scss';
import { IconButton, Box } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { fetchProfileInfo } from '../../redux/ducks/profile';

const defaultHandleClick = (dispatch: React.Dispatch<any>) =>
  dispatch(fetchProfileInfo('yellso'));

export const Error: React.FC<ErrorProps> = ({
  handleClick = defaultHandleClick,
  mx = 'auto',
}) => {
  const dispatch = useDispatch();
  return (
    <Box mx={mx} my="auto">
      Something went wrong...
      <IconButton
        color="secondary"
        size="medium"
        onClick={() => handleClick(dispatch)}
      >
        <Replay />
      </IconButton>
    </Box>
  );
};
