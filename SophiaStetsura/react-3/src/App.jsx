import React, { Component } from 'react';
import './css/styles.css';
import ChatLayout from './Components/ChatLayout';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChatLayout />
    );
  }
}