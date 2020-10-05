import React from 'react';
import './Button.css';

export default function Button(props) {
  // const handleClick = (event) => {
  //   console.log(event);
  //   console.log('Тестовая кнопка');
  // };

  return(
    <button onClick={props.handleClick}>{props.buttonText}</button>
  );
}