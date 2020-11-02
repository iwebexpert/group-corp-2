import React from 'react';
import classnames from 'classnames';
import './Container.css';

type ContainerType = {
  modifiers?: string;
  children: any;
};

export const Container: React.FC<ContainerType> = ({ modifiers, children }) => {
  return(
    <div className={classnames('container', modifiers)}>{children}</div>
  );
}