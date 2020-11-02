import React from 'react';
import classnames from 'classnames';
import './Content.css'

type ContentType = {
  modifiers?: string;
  children: any;
};

export const Content: React.FC<ContentType> = ({ modifiers, children }) => {
  return(
    <div className={classnames('content', modifiers)}>{children}</div>
  );
}