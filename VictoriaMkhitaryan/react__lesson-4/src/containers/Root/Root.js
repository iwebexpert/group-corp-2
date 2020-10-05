import React, { Component } from 'react';
import Messenger from '../Messenger/Messenger';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';

export default class Root extends Component {
    state={
        person:{
            name: "Person",
            age: 60, 
        }
  }


  render() {
    return (
      <>
        <Switch>
          <Route exact path="/chats/:id" render={ 
            (props) => <Messenger person={this.state.person} 
                                    id={Number(props.match.params.id)} 
                                    />
          } />
          <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
          <Route path="*" >
            <NotFoundScreen />
          </Route>
        </Switch>
      </>
    )
  }
}
