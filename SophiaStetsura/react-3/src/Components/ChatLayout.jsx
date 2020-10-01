import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import MessageField from './MessageField';
import ChatList from './ChatList';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: '100vh',
  },
  chatList: {
    backgroundColor: '#182633',
    borderRight: '1px solid #0e1622',
  },
  messageField: {
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '1fr 36px',
  },
}));

// eslint-disable-next-line react/display-name
export default () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.container} container alignItems="stretch">
        <Hidden only={['xs', 'sm']}>
          <Grid className={classes.chatList} item xs={3}>
            <ChatList />
          </Grid>
        </Hidden>
        <Grid className={classes.messageField} item xs>
          <MessageField />
        </Grid>
      </Grid>
    </>
  );
};