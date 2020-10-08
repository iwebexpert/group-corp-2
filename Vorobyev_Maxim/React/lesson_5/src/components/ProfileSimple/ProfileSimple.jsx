import React, { Component } from 'react';
import './profileSimple.scss';

export class ProfileSimple extends Component {
  render() {
    const { name, age } = this.props;
    return (
      <>
        <div>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
        </div>
      </>
    );
  }
}