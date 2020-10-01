import React from 'react';
import classnames from 'classnames';
import './Content.css'

export default function Content(props) {
  return(
    <div className={classnames('content', props.modifiers)}>{props.children}</div>
  );
}