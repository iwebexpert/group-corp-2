import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import './Header.scss';
import { Spinner } from '../Spinner';
import { Error } from '../Error';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { fetchProfileInfo } from '../../redux/ducks/profile';
import { AppState, AppDispatch } from '../../redux/rootReducer';

const drawerWidth: number = 240;

const useStyles: () => Record<string, string> = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

export const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { profileReducer } = useSelector((state: AppState) => state);
  const { data, sticker, error } = profileReducer;

  const classes = useStyles();
  const { root, title, appBar } = classes;

  useEffect(() => {
    if (!data) dispatch(fetchProfileInfo('yellso'));
  }, []);

  return (
    <div className={root}>
      <AppBar position="static" className={appBar}>
        <Toolbar>
          <Typography variant="h6" className={title}>
            <div onClick={() => dispatch(push('/'))}>Messenger</div>
          </Typography>
          {error ? <Error /> : null}
          <Typography variant="h6" className={title}>
            {data === null ? (
              <Spinner size={40} color="white" />
            ) : (
              `${data.username} ${sticker === null ? '' : sticker}`
            )}
          </Typography>
          <Link to="/profile" className="Header-link__reset">
            <IconButton edge="start" color="inherit">
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
