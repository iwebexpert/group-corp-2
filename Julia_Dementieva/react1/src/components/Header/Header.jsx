import React, { Component } from 'react'
import {Avatar,  withStyles} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

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
                <Link to="/" style={{ textDecoration: 'none' }}><div className="header-logo">VChats</div></Link>
                <Link to="/About" style={{ textDecoration: 'none' }}>
                    <div className="header-avatar">
                        <Avatar className={classes.root} src={this.props.person.avatar} />
                        {this.props.person.name}
                    </div>
                </Link>
            </div>
        )
    }
}

export const Header = withStyles(styles)(HeaderClass);
