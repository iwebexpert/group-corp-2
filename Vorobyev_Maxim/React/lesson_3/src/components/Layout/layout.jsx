import React, {Component} from 'react';
import {Header} from '../Header';
import {MessageField} from '../MessageField';
import {ChatList} from '../ChatList';
import './layout.scss';

export class Layout extends Component {
  render() {
    return (
      <>
        <div className="blockForFlexHieght">
          <Header/>
          <div className="commonBlock">
            <ChatList/>
            <MessageField/>
          </div>
        </div>
      </>
    );
  }
}