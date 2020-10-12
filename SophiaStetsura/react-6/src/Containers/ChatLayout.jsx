import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import MessageField from './MessageField';
import ChatList from './ChatList';
import ChatHeader from './ChatHeader';

export default class ChatLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chatId } = this.props;

    return (
      <Grid className="grid-container" container alignItems="stretch">
        <Hidden only={['xs', 'sm']}>
          <Grid className="chatList" item xs={3}>
            <ChatList />
          </Grid>
        </Hidden>
        <Grid className="messageField" item xs>
          <ChatHeader chatId={chatId} />
          <MessageField chatId={chatId} />
        </Grid>
      </Grid>
    );
  }
}

ChatLayout.propTypes = {
  chatId: PropTypes.number,
};

ChatLayout.defaultProps = {
  chatId: 0,
};