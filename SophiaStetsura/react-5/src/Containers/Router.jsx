import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatLayout from './ChatLayout';
import Profile from './Profile';

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ChatLayout} />
        <Route
          exact
          path="/chat/:chatId/"
          render={obj => <ChatLayout chatId={Number(obj.match.params.chatId)} />}
        />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    );
  }
}