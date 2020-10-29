import React from 'react';
import { useDispatch } from 'react-redux';
import './Error.scss';
import { IconButton, Box } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { fetchProfileInfo } from '../../redux/ducks/profile';
import { AppDispatch } from '../../redux/rootReducer';

type ErrorProps = {
  handleClick?: (dispatch: AppDispatch) => void;
  mx?: string;
};

const defaultHandleClick = (dispatch: AppDispatch) =>
  dispatch(fetchProfileInfo('yellso'));

export const Error: React.FC<ErrorProps> = ({
  handleClick = defaultHandleClick,
  mx = 'auto',
}) => {
  const dispatch: AppDispatch = useDispatch();
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
