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

    handleRedirect = () => {
        this.props.push('/');
    }

    render() {
        const {infoPerson, classes} = this.props;
        return (
            <div className="header">
                {/* <Link to="/" style={{ textDecoration: 'none' }}><div className="header-logo">VChats</div></Link> */}
                <div button="true" onClick={this.handleRedirect} style={{ cursor: 'pointer' }} className="header-logo">VChats</div>
                <Link to="/About" style={{ textDecoration: 'none' }}>
                    <div className="header-avatar">
                        <Avatar className={classes.root} src={infoPerson.avatar} />
                        {infoPerson.name}
                    </div>
                </Link>
            </div>
        )
    }
}

export const Header = withStyles(styles)(HeaderClass);
