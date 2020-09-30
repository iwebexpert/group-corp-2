import React, {Component} from 'react';
import './List.scss';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export class List extends Component{
    render(){
        return (
          <div className="list">
            <MenuList>
              <MenuItem>Chat 1</MenuItem>
              <MenuItem>Chat 2</MenuItem>
              <MenuItem>Chat 3</MenuItem>
            </MenuList>
          </div>
        );};
};