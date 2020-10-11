import React from 'react';
import './Button.css';

export default function Button(props) {
  return(
    <button onClick={props.handleClick}>{props.buttonText}</button>
  );
}