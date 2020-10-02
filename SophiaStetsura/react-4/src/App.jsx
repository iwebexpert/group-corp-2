import React, { Component } from 'react';
import './css/styles.css';
// import ChatLayout from './Components/ChatLayout';
import { BrowserRouter } from 'react-router-dom';
import Router from './Components/Router';

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    return (
      // <ChatLayout />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}