import React from 'react';
import {Avatar,  makeStyles} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

import {InfoPersonType} from '../../pages/About';

import './Header.css';

const useStyles = makeStyles({
    root: {
        backgroundColor: deepOrange[500], 
      },
});

type HeaderType = {
    infoPerson: InfoPersonType;
}

export const Header: React.FC<HeaderType> = ({infoPerson}) => {
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