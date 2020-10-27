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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

export const Header = () => {
  const dispatch = useDispatch();
  const { profileReducer } = useSelector((state) => state);
  const { data, sticker, error } = profileReducer;

  const classes = useStyles();
  const { root, menuButton, title, appBar } = classes;

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
            <IconButton edge="start" className={menuButton} color="inherit">
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
