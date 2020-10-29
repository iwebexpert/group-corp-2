import React from 'react';
import { MessengerScreen } from '../MessengerScreen/MessengerScreen';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFoundScreen } from '../NotFoundScreen/NotFoundScreen.tsx';
import { ProfileScreen } from '../ProfileScreen/ProfileScreen';

export const Root = () => {
  return (
    <>
      <Switch>
        <Route exact path="/chats" component={ MessengerScreen } />
        <Route exact path="/chats/:chatId" component={ MessengerScreen } />
        <Route exact path="/profile" component={ ProfileScreen } />
        <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
        <Route path="*" >
          <NotFoundScreen />
        </Route>
      </Switch>
    </>
  )
}