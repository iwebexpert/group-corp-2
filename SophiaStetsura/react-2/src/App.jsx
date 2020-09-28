import React, { Component } from 'react';
// import './css/styles.css';
import MessageField from './Components/MessageField';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MessageField />;
  }
}