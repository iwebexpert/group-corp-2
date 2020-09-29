import React, { Component } from 'react'
import {Avatar, TextField, Fab, withStyles} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

import './Header.css';

const styles = {
    root: {
        backgroundColor: deepOrange[500],
        
      },
      large: {
        width: '7px',
        height: '7px',
      },
};

class HeaderClass extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className="header">
                <div className="header-logo">VChats</div>
                <div className="header-avatar">
                    <Avatar className={classes.root}>W</Avatar>
                    {this.props.name}
                </div>
            </div>
        )
    }
}

export const Header = withStyles(styles)(HeaderClass);
