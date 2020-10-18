import React from 'react';
import {Avatar,  makeStyles} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';


import './Header.css';

const useStyles = makeStyles({
    root: {
        backgroundColor: deepOrange[500], 
      },
});

export const Header = ({infoPerson}) => {

    const classes = useStyles();

    return (
        (infoPerson.name) ?
        (<div className="header">
            <Link to="/" style={{ textDecoration: 'none' }}><div className="header-logo">VChats</div></Link>
            <Link to="/About" style={{ textDecoration: 'none' }}>
                <div className="header-avatar">
                    <Avatar className={classes.root} src={infoPerson.avatar} />
                    {infoPerson.name}
                </div>
            </Link>
        </div>) : <div>Данные загружаются</div>
    )
 }