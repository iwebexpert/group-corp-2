import React, {Component} from "react";
import './messageField.scss';
import {Messenger} from '../Messenger';

export class MessageField extends Component {
  render () {
    return (
      <div className="messageFieldBlock">
        <Messenger/>
      </div>
    );
  }
}