import React, { Component } from 'react';
import Messenger from '../Messenger/Messenger';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

export default class Root extends Component {
    state={
        person:{
            name: "Person",
            gender: true,
            age: 25,
            city: "Москва"
        }
  }


  render() {
    return (
      <>
        <Switch>
          <Route exact path="/chats">
            <Messenger person={this.state.person} />
          </Route>
          <Route exact path="/chats/:id" render={ 
            (props) => <Messenger person={this.state.person} 
                                  id={Number(props.match.params.id)} />
          } />
          <Route exact path="/profile" render={() => (<ProfileScreen person={this.state.person}/>)}/>
          <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
          <Route path="*" >
            <NotFoundScreen />
          </Route>
        </Switch>
      </>
    )
  }
}
