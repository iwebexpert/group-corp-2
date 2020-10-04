import React, {Component} from "react";
import './messageField.scss';
import {Messenger} from '../Messenger';
import {Switch, Route, Link} from 'react-router-dom';

export class MessageField extends Component {
  render () {
    console.log(this.props);
    return (
      <div className="messageFieldBlock">
        <Switch>
          <Route path="/chats/:id([0-9]+)" render={(props) => <Messenger {...props}/>} exact/>
        </Switch>
      </div>
    );
  }
}