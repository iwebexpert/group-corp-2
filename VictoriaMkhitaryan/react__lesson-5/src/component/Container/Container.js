import React from 'react';
import classnames from 'classnames';
import './Container.css';

export default function Container(props) {
  return(
    <div className={classnames('container', props.modifiers)}>{props.children}</div>
  );
}