import React from 'react';
import { useDispatch } from 'react-redux';
import './Error.scss';
import { IconButton, Box } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { fetchProfileInfo } from '../../redux/ducks/profile';

type Props = {
  handleClick?: (dispatch: React.Dispatch<any>) => void;
  mx?: string;
};

export const Error: React.FC<Props> = ({ handleClick, mx }) => {
  const dispatch = useDispatch();
  return (
    <Box mx={mx} my="auto">
      Something went wrong...
      {handleClick && (
        <IconButton
          color="secondary"
          size="medium"
          onClick={() => handleClick(dispatch)}
        >
          <Replay />
        </IconButton>
      )}
    </Box>
  );
};

/**
 * defaultProps doesn't work yet for FC: https://github.com/microsoft/TypeScript/issues/31247
 * so, here handleClick flag on line 18 is .-.
 *
 * check the https://github.com/Unsleeping/group-corp-2/blob/default-props-issue/AlexanderMandrov/TypeScript/messenger/src/components/Error/Error.tsx
 * for original version which won't contains any errors after fixing that issue
 */
Error.defaultProps = {
  handleClick: (dispatch) => dispatch(fetchProfileInfo('yellso')),
  mx: 'auto',
} as Partial<Props>;
