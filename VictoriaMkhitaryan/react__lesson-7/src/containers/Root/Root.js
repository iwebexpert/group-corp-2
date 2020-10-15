import React, { Component } from 'react';
import MessengerScreen from '../MessengerScreen/MessengerScreen';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

export default class Root extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/chats" render={ 
            (props) => <MessengerScreen />
          } />
          <Route exact path="/chats/:id" render={ 
            (props) => <MessengerScreen  id={ Number(props.match.params.id) } />
          } />
          <Route exact path="/profile" render={() => (<ProfileScreen />)}/>
          <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
          <Route path="*" >
            <NotFoundScreen />
          </Route>
        </Switch>
      </>
    )
  }
}